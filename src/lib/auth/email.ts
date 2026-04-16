import nodemailer from "nodemailer";

function getTransporter() {
  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT ?? "587", 10);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    // In development or when SMTP is not configured, log to console
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
}

export async function sendWelcomeEmail(opts: {
  to: string;
  name: string;
  password: string;
  appUrl: string;
}): Promise<boolean> {
  const transporter = getTransporter();

  const htmlBody = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><style>
  body { font-family: Arial, sans-serif; color: #333; background: #f9f9f9; }
  .card { max-width: 500px; margin: 40px auto; background: #fff; border-radius: 8px; padding: 32px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
  h1 { color: #2E3641; font-size: 24px; }
  .credentials { background: #f4f4f4; border-radius: 6px; padding: 16px; margin: 20px 0; }
  .label { color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; }
  .value { font-family: monospace; font-size: 16px; color: #2E3641; font-weight: bold; }
  .btn { display: inline-block; background: #FFB800; color: #2E3641; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-weight: bold; margin: 16px 0; }
  .footer { color: #999; font-size: 12px; margin-top: 24px; border-top: 1px solid #eee; padding-top: 16px; }
</style></head>
<body>
  <div class="card">
    <h1>🎯 Willkommen beim Prompting Hack!</h1>
    <p>Hallo ${opts.name},</p>
    <p>dein Zugang zum <strong>Prompting Hack</strong> — dem Prompt-Engineering-Trainer der Mecklenburgischen Versicherung — wurde eingerichtet.</p>
    <div class="credentials">
      <div class="label">E-Mail-Adresse</div>
      <div class="value">${opts.to}</div>
      <br>
      <div class="label">Passwort (einmalig)</div>
      <div class="value">${opts.password}</div>
    </div>
    <a href="${opts.appUrl}/login" class="btn">Jetzt einloggen →</a>
    <p style="color:#888; font-size:13px;">Bitte ändere dein Passwort nach dem ersten Login.</p>
    <div class="footer">
      Mecklenburgische Versicherung — Unternehmensentwicklung<br>
      <a href="${opts.appUrl}">${opts.appUrl}</a>
    </div>
  </div>
</body>
</html>`;

  const textBody = `Willkommen beim Prompting Hack!

Hallo ${opts.name},

dein Zugang wurde eingerichtet.

E-Mail:   ${opts.to}
Passwort: ${opts.password}

Login: ${opts.appUrl}/login

Bitte ändere dein Passwort nach dem ersten Login.

Mecklenburgische Versicherung — Unternehmensentwicklung`;

  if (!transporter) {
    // No SMTP configured — log to console (dev mode)
    console.info("[Email] Welcome email would be sent to:", opts.to);
    console.info("[Email] Password:", opts.password);
    return true;
  }

  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM ?? `"Prompting Hack" <${process.env.SMTP_USER}>`,
      to: opts.to,
      subject: "Dein Zugang zum Prompting Hack",
      text: textBody,
      html: htmlBody,
    });
    return true;
  } catch (err) {
    console.error("[Email] Failed to send welcome email:", err);
    return false;
  }
}
