import { couple, ceremony, wedding } from "@/config/site-content";

function toUtcStamp(date: Date) {
  return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
}

const start = new Date(wedding.dateTimeIso);
const end = new Date(start.getTime() + 8 * 60 * 60 * 1000); // duración estimada: 8h

const eventTitle = `Boda de ${couple.displayNames}`;
const eventLocation = ceremony.address;

const googleCalendarUrl = new URL("https://calendar.google.com/calendar/render");
googleCalendarUrl.searchParams.set("action", "TEMPLATE");
googleCalendarUrl.searchParams.set("text", eventTitle);
googleCalendarUrl.searchParams.set(
  "dates",
  `${toUtcStamp(start)}/${toUtcStamp(end)}`
);
googleCalendarUrl.searchParams.set("location", eventLocation);

const icsContent = [
  "BEGIN:VCALENDAR",
  "VERSION:2.0",
  "BEGIN:VEVENT",
  `SUMMARY:${eventTitle}`,
  `LOCATION:${eventLocation}`,
  `DTSTART:${toUtcStamp(start)}`,
  `DTEND:${toUtcStamp(end)}`,
  "END:VEVENT",
  "END:VCALENDAR",
].join("\r\n");

const icsHref = `data:text/calendar;charset=utf-8,${encodeURIComponent(icsContent)}`;

export default function AddToCalendarButton() {
  return (
    <div className="flex flex-wrap gap-3">
      <a
        href={googleCalendarUrl.toString()}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-full border border-terracotta px-5 py-2 text-sm text-terracotta transition hover:bg-terracotta hover:text-cream"
      >
        Google Calendar
      </a>
      <a
        href={icsHref}
        download="boda-javier-y-maria.ics"
        className="rounded-full border border-terracotta px-5 py-2 text-sm text-terracotta transition hover:bg-terracotta hover:text-cream"
      >
        Apple / Outlook (.ics)
      </a>
    </div>
  );
}
