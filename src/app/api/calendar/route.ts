import { getIcsContent } from "@/lib/calendar-event";

// Se sirve como archivo real (no data: URI) porque iOS Safari no gestiona
// bien los enlaces data: con el atributo download: los ignora en silencio.
// Con "inline" y un Content-Type correcto, Safari abre directamente la
// pantalla de "Añadir evento" del Calendario.
export async function GET() {
  return new Response(getIcsContent(), {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": 'inline; filename="boda-javier-y-maria.ics"',
    },
  });
}
