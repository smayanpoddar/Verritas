import { Resend } from "resend";

// Resend's free tier only allows sending to the account owner's own
// address until a domain is verified (resend.com/domains). Once
// verritas.in is verified, add shreevar@verritas.in and
// bhanu@verritas.in back into this list and switch FROM_EMAIL below
// to an @verritas.in address.
const TO_EMAILS = ["smayanpoddar@gmail.com"];
// Resend's shared sending domain — works immediately with no setup.
// Swap to an address on your own domain once it's verified in Resend
// (Domains → Add Domain), e.g. "Verritas <enquiries@verritas.com>".
const FROM_EMAIL = "Verritas Website <onboarding@resend.dev>";

type EnquiryBody = {
  kind?: "dealer" | "general";
  name?: string;
  company?: string;
  city?: string;
  phone?: string;
  email?: string;
  message?: string;
};

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

export async function POST(request: Request) {
  let body: EnquiryBody;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { kind = "dealer", name, company, city, phone, email, message } = body;

  const missing = ["name", "company", "city", "phone"].filter(
    (field) => !isNonEmptyString(body[field as keyof EnquiryBody])
  );
  if (missing.length > 0) {
    return Response.json(
      { error: `Missing required field(s): ${missing.join(", ")}.` },
      { status: 400 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error(
      "RESEND_API_KEY is not set — see .env.local.example for setup."
    );
    return Response.json(
      { error: "Enquiry service isn't configured yet. Please try again later." },
      { status: 500 }
    );
  }

  const subject =
    kind === "dealer" ? `Dealer Enquiry — ${company}` : `Enquiry — ${company}`;

  const bodyLines = [
    `Name: ${name}`,
    `Company / Firm: ${company}`,
    `City: ${city}`,
    `Phone: ${phone}`,
    isNonEmptyString(email) ? `Email: ${email}` : null,
    isNonEmptyString(message) ? `\nMessage:\n${message}` : null,
  ].filter(Boolean);

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAILS,
      replyTo: isNonEmptyString(email) ? email : undefined,
      subject,
      text: bodyLines.join("\n"),
    });

    if (error) {
      console.error("Resend error:", error);
      return Response.json(
        { error: "Couldn't send your enquiry. Please try again." },
        { status: 502 }
      );
    }
  } catch (err) {
    console.error("Enquiry send failed:", err);
    return Response.json(
      { error: "Couldn't send your enquiry. Please try again." },
      { status: 500 }
    );
  }

  return Response.json({ ok: true });
}
