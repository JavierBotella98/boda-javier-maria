import { RsvpInput } from "./rsvp-schema";

// Envía un email a los administradores cada vez que llega una nueva
// confirmación. No-op hasta que se configure RESEND_API_KEY (ver
// .env.example) — no debe bloquear ni hacer fallar el envío del formulario.
export async function notifyAdminsOfNewRsvp(rsvp: RsvpInput) {
  const apiKey = process.env.RESEND_API_KEY;
  const notifyEmail = process.env.ADMIN_NOTIFICATION_EMAIL;

  if (!apiKey || !notifyEmail) {
    return;
  }

  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Boda <no-reply@javierymaria2027.com>",
        to: notifyEmail,
        subject: `Nueva confirmación: ${rsvp.guestName}`,
        text: `${rsvp.guestName} ha confirmado asistencia: ${
          rsvp.attending ? "SÍ" : "NO"
        }. Acompañantes: ${rsvp.companions.length}.`,
      }),
    });
  } catch (error) {
    console.error("No se pudo enviar la notificación por email", error);
  }
}
