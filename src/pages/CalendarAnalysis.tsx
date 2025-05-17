import React, { useEffect, useState } from 'react';
import { analyzeCalendar } from '../utils/calendarAnalyzer';
import { format } from 'date-fns';
import { AlertTriangle, Loader2 } from 'lucide-react';

const CALENDAR_URL = 'https://calendar.google.com/calendar/ical/3e3db8e1e0e6dd57cc812495e53481d14d14c254c69895e11b436ad277385ce5%40group.calendar.google.com/public/basic.ics';

export default function CalendarAnalysis() {
  const [analysis, setAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCalendarData() {
      try {
        const result = await analyzeCalendar(CALENDAR_URL);
        if (result.error) {
          setError(result.error);
        } else {
          setAnalysis(result);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to analyze calendar');
      } finally {
        setLoading(false);
      }
    }

    fetchCalendarData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-[#39FF14]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
          <h2 className="text-xl font-bold text-red-400 mb-2">Calendar Access Error</h2>
          <p className="text-gray-300">{error}</p>
          <div className="mt-4 bg-black/30 rounded-lg p-4">
            <h3 className="font-semibold mb-2">Troubleshooting Steps:</h3>
            <ul className="list-disc list-inside space-y-2 text-sm text-gray-300">
              <li>Verify the calendar URL is correct and accessible</li>
              <li>Check if the calendar is public and sharing is enabled</li>
              <li>Try accessing the calendar URL directly in a browser</li>
              <li>Clear browser cache and try again</li>
              <li>Check your internet connection</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Calendar Analysis</h1>
      
      {analysis.events.length === 0 ? (
        <p className="text-gray-400">No events found in the next 30 days.</p>
      ) : (
        <>
          <div className="space-y-6">
            <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Upcoming Events (Next 30 Days)</h2>
              <ul className="space-y-4">
                {analysis.events.map((event: any, index: number) => (
                  <li key={index} className="border-b border-white/10 last:border-0 pb-4 last:pb-0">
                    <h3 className="font-semibold text-[#39FF14]">{event.title}</h3>
                    <div className="text-sm text-gray-300 mt-1 space-y-1">
                      <p>📅 {format(event.start, 'PPP')} at {format(event.start, 'p')}</p>
                      <p>⏱️ Duration: {event.duration}</p>
                      {event.location && <p>📍 {event.location}</p>}
                      {event.description && (
                        <p className="text-gray-400 mt-2 text-sm">{event.description}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {analysis.conflicts.length > 0 && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <AlertTriangle className="text-red-400" />
                  Scheduling Conflicts
                </h2>
                <ul className="space-y-4">
                  {analysis.conflicts.map((conflict: any, index: number) => (
                    <li key={index} className="border-b border-red-500/20 last:border-0 pb-4 last:pb-0">
                      <p className="text-red-400 font-semibold">Conflict Detected:</p>
                      <div className="ml-4 mt-2 space-y-2 text-sm">
                        <p>• {conflict.event1.title}</p>
                        <p className="text-gray-400">
                          {format(conflict.event1.start, 'PPp')} - {format(conflict.event1.end, 'p')}
                        </p>
                        <p>overlaps with</p>
                        <p>• {conflict.event2.title}</p>
                        <p className="text-gray-400">
                          {format(conflict.event2.start, 'PPp')} - {format(conflict.event2.end, 'p')}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}