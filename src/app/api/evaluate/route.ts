import { NextRequest, NextResponse } from "next/server";
import type { ScenarioId, EvaluationResult } from "@/lib/types";
import { evaluatePromptRuleBased } from "@/lib/evaluation";
import { buildMetaPrompt } from "@/lib/api";

interface EvaluateBody {
  prompt: string;
  scenarioId: ScenarioId;
  level: number;
}

export async function POST(request: NextRequest) {
  let body: EvaluateBody;

  try {
    body = (await request.json()) as EvaluateBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { prompt, scenarioId, level } = body;

  if (!prompt || !scenarioId || !level) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey || apiKey === "sk-ant-PLACEHOLDER") {
    const result = evaluatePromptRuleBased(prompt, scenarioId);
    return NextResponse.json(result);
  }

  try {
    const metaPrompt = buildMetaPrompt(prompt, scenarioId, level);

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-5",
        max_tokens: 2000,
        messages: [{ role: "user", content: metaPrompt }],
      }),
      signal: AbortSignal.timeout(12000),
    });

    if (!response.ok) {
      return NextResponse.json(evaluatePromptRuleBased(prompt, scenarioId));
    }

    const data = (await response.json()) as {
      content: Array<{ type: string; text: string }>;
    };

    const text = data.content?.[0]?.text ?? "";
    const jsonMatch = text.match(/\{[\s\S]*\}/);

    if (!jsonMatch) {
      return NextResponse.json(evaluatePromptRuleBased(prompt, scenarioId));
    }

    const aiResult = JSON.parse(jsonMatch[0]) as EvaluationResult;
    aiResult.source = "ai";
    return NextResponse.json(aiResult);
  } catch {
    return NextResponse.json(evaluatePromptRuleBased(prompt, scenarioId));
  }
}
