import { couple, ceremony, wedding } from "@/config/site-content";

function toUtcStamp(date: Date) {
  return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
}

const start = new Date(wedding.dateTimeIso);
const end = new Date(start.getTime() + 8 * 60 * 60 * 1000); // duración estimada: 8h

export const eventTitle = `Boda de ${couple.displayNames}`;
export const eventLocation = ceremony.address;

export function getGoogleCalendarUrl() {
  const url = new URL("https://calendar.google.com/calendar/render");
  url.searchParams.set("action", "TEMPLATE");
  url.searchParams.set("text", eventTitle);
  url.searchParams.set("dates", `${toUtcStamp(start)}/${toUtcStamp(end)}`);
  url.searchParams.set("location", eventLocation);
  return url.toString();
}

export function getIcsContent() {
  return [
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
}
