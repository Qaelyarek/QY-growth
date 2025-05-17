import ICAL from 'ical.js';
import { addDays, isWithinInterval, parseISO, format, intervalToDuration } from 'date-fns';

interface CalendarEvent {
  title: string;
  start: Date;
  end: Date;
  location?: string;
  description?: string;
  duration: string;
}

interface OverlappingEvent {
  event1: CalendarEvent;
  event2: CalendarEvent;
}

export async function analyzeCalendar(url: string): Promise<{
  events: CalendarEvent[];
  conflicts: OverlappingEvent[];
  error?: string;
}> {
  try {
    // Try multiple CORS proxies
    const proxies = [
      'https://api.allorigins.win/raw?url=',
      'https://corsproxy.io/?'
    ];

    let icalData: string | null = null;
    let error: Error | null = null;

    // Try each proxy until one works
    for (const proxy of proxies) {
      try {
        const response = await fetch(`${proxy}${encodeURIComponent(url)}`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        icalData = await response.text();
        if (icalData.includes('BEGIN:VCALENDAR')) break;
      } catch (e) {
        error = e as Error;
        continue;
      }
    }

    if (!icalData) {
      throw error || new Error('Failed to fetch calendar data');
    }

    const jcalData = ICAL.parse(icalData);
    const comp = new ICAL.Component(jcalData);
    const vevents = comp.getAllSubcomponents('vevent');

    const now = new Date();
    const thirtyDaysFromNow = addDays(now, 30);

    const events: CalendarEvent[] = vevents
      .map(vevent => {
        const event = new ICAL.Event(vevent);
        const start = event.startDate.toJSDate();
        const end = event.endDate.toJSDate();

        // Only include events in the next 30 days
        if (!isWithinInterval(start, { start: now, end: thirtyDaysFromNow })) {
          return null;
        }

        const duration = intervalToDuration({ start, end });
        const durationStr = formatDuration(duration);

        return {
          title: event.summary || 'Untitled Event',
          start,
          end,
          location: event.location || undefined,
          description: event.description || undefined,
          duration: durationStr
        };
      })
      .filter((event): event is CalendarEvent => event !== null)
      .sort((a, b) => a.start.getTime() - b.start.getTime());

    const conflicts = findOverlappingEvents(events);

    return { events, conflicts };
  } catch (error) {
    return {
      events: [],
      conflicts: [],
      error: error instanceof Error ? error.message : 'An unknown error occurred'
    };
  }
}

function formatDuration(duration: Duration): string {
  const parts = [];
  if (duration.days) parts.push(`${duration.days}d`);
  if (duration.hours) parts.push(`${duration.hours}h`);
  if (duration.minutes) parts.push(`${duration.minutes}m`);
  return parts.join(' ') || '0m';
}

function findOverlappingEvents(events: CalendarEvent[]): OverlappingEvent[] {
  const conflicts: OverlappingEvent[] = [];
  
  for (let i = 0; i < events.length; i++) {
    for (let j = i + 1; j < events.length; j++) {
      const event1 = events[i];
      const event2 = events[j];
      
      if (event1.start < event2.end && event2.start < event1.end) {
        conflicts.push({ event1, event2 });
      }
    }
  }
  
  return conflicts;
}