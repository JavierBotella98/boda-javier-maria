import { getGoogleCalendarUrl } from "@/lib/calendar-event";

export default function AddToCalendarButton() {
  return (
    <div className="flex flex-wrap gap-3">
      <a
        href={getGoogleCalendarUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-full border border-terracotta px-5 py-2 text-sm text-terracotta transition hover:bg-terracotta hover:text-cream"
      >
        Google Calendar
      </a>
      <a
        href="/api/calendar"
        className="rounded-full border border-terracotta px-5 py-2 text-sm text-terracotta transition hover:bg-terracotta hover:text-cream"
      >
        Apple / Outlook (.ics)
      </a>
    </div>
  );
}
