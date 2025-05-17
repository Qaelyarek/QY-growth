import React, { useState, useEffect, useCallback, useMemo } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import ICAL from 'ical.js';
import { format } from 'date-fns';
import { RefreshCw, Calendar as CalendarIcon, AlertCircle } from 'lucide-react';
import { CalendarErrorBoundary } from './CalendarErrorBoundary';
import { CalendarSkeleton } from './CalendarSkeleton';
import { toast } from 'react-hot-toast';

// Updated CORS proxies with more reliable services
const CORS_PROXIES = [
  'https://api.allorigins.win/raw?url=',
  'https://corsproxy.io/?',
  'https://cors-anywhere.herokuapp.com/'
];

const CALENDAR_URL = 'https://calendar.google.com/calendar/ical/3e3db8e1e0e6dd57cc812495e53481d14d14c254c69895e11b436ad277385ce5%40group.calendar.google.com/public/basic.ics';

const CACHE_KEY = 'calendar_data';
const CACHE_EXPIRY = 5 * 60 * 1000; // 5 minutes
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

interface CachedData {
  events: any[];
  timestamp: number;
}

export const Schedule: React.FC = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  const parseICalData = useCallback((icalData: string) => {
    if (!icalData || typeof icalData !== 'string') {
      throw new Error('Invalid calendar data received');
    }

    if (!icalData.includes('BEGIN:VCALENDAR')) {
      throw new Error('Invalid calendar data format');
    }

    try {
      const jcalData = ICAL.parse(icalData);
      const comp = new ICAL.Component(jcalData);
      const vevents = comp.getAllSubcomponents('vevent');

      if (!vevents || vevents.length === 0) {
        return [];
      }

      return vevents.map(vevent => {
        const event = new ICAL.Event(vevent);
        const startDate = event.startDate?.toJSDate();
        const endDate = event.endDate?.toJSDate();

        if (!startDate || !endDate) {
          console.warn('Invalid event dates:', event.summary);
          return null;
        }

        return {
          id: event.uid || crypto.randomUUID(),
          title: event.summary || 'Untitled Event',
          start: startDate,
          end: endDate,
          location: event.location || '',
          description: event.description || '',
          className: `event-${event.categories?.[0]?.toLowerCase() || 'default'}`
        };
      }).filter(Boolean);
    } catch (error) {
      console.error('Error parsing iCal data:', error);
      throw new Error('Failed to parse calendar data');
    }
  }, []);

  const fetchWithRetry = async (url: string, retries = MAX_RETRIES): Promise<Response> => {
    try {
      const response = await fetch(url, {
        headers: {
          'Accept': 'text/calendar, application/calendar, text/plain',
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return response;
    } catch (error) {
      if (retries > 0) {
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
        return fetchWithRetry(url, retries - 1);
      }
      throw error;
    }
  };

  const fetchCalendarData = useCallback(async (force = false) => {
    setError(null);

    try {
      // Check cache first if not forcing refresh
      if (!force) {
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          const { events, timestamp }: CachedData = JSON.parse(cached);
          if (Date.now() - timestamp < CACHE_EXPIRY) {
            setEvents(events);
            setLastUpdated(new Date(timestamp));
            setIsLoading(false);
            return;
          }
        }
      }

      let success = false;
      let lastError;

      // Try each CORS proxy in sequence
      for (const proxy of CORS_PROXIES) {
        if (retryCount >= MAX_RETRIES) {
          throw new Error('Maximum retry attempts reached');
        }

        try {
          const proxyUrl = `${proxy}${encodeURIComponent(CALENDAR_URL)}`;
          const response = await fetchWithRetry(proxyUrl);
          const icalData = await response.text();
          
          const calendarEvents = parseICalData(icalData);
          
          setEvents(calendarEvents);
          setLastUpdated(new Date());
          setRetryCount(0);

          // Update cache
          localStorage.setItem(CACHE_KEY, JSON.stringify({
            events: calendarEvents,
            timestamp: Date.now()
          }));

          if (force) {
            toast.success('Calendar refreshed successfully');
          }

          success = true;
          break;
        } catch (error) {
          lastError = error;
          console.warn(`CORS proxy ${proxy} failed:`, error);
          setRetryCount(prev => prev + 1);
          continue;
        }
      }

      if (!success) {
        throw lastError || new Error('All CORS proxies failed');
      }
    } catch (error) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'Failed to load calendar data';
      
      console.error('Calendar fetch error:', error);
      setError(errorMessage);

      // Try to load cached data
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        try {
          const { events, timestamp }: CachedData = JSON.parse(cached);
          setEvents(events);
          setLastUpdated(new Date(timestamp));
          toast.error('Unable to fetch new data. Showing cached calendar.');
        } catch (cacheError) {
          toast.error('Unable to load calendar data');
        }
      } else {
        toast.error('Unable to load calendar data');
      }
    } finally {
      setIsLoading(false);
    }
  }, [retryCount, parseICalData]);

  useEffect(() => {
    fetchCalendarData();
    const interval = setInterval(() => fetchCalendarData(), CACHE_EXPIRY);
    return () => clearInterval(interval);
  }, [fetchCalendarData]);

  const handleRefresh = () => {
    setIsLoading(true);
    fetchCalendarData(true);
  };

  const renderEventContent = (eventInfo: any) => (
    <div className="p-1">
      <div className="font-semibold text-sm truncate">{eventInfo.event.title}</div>
      {eventInfo.event.extendedProps.location && (
        <div className="text-xs text-gray-300 truncate">
          📍 {eventInfo.event.extendedProps.location}
        </div>
      )}
    </div>
  );

  const calendarOptions = useMemo(() => ({
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    events,
    eventContent: renderEventContent,
    height: 'auto',
    eventDidMount: (info: any) => {
      info.el.title = `${info.event.title}\n${format(info.event.start, 'PPp')}${
        info.event.extendedProps.location ? `\n📍 ${info.event.extendedProps.location}` : ''
      }`;
    },
    dayMaxEvents: true,
    views: {
      timeGrid: {
        dayMaxEvents: 6,
        nowIndicator: true,
      }
    }
  }), [events]);

  return (
    <div className="min-h-screen bg-dark text-white font-mono py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CalendarIcon className="w-8 h-8 text-[#39FF14]" />
            <h1 className="text-3xl font-bold tracking-tight">Schedule</h1>
          </div>
          <div className="flex items-center gap-4">
            {lastUpdated && (
              <span className="text-sm text-gray-400">
                Last updated: {format(lastUpdated, 'PP p')}
              </span>
            )}
            <button
              onClick={handleRefresh}
              disabled={isLoading}
              className="flex items-center gap-2 px-4 py-2 bg-black/30 backdrop-blur-sm border border-white/10 rounded-md hover:bg-black/50 transition-all disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-6 bg-red-500/10 border border-red-500/20 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-red-400">Error loading calendar</h3>
              <p className="text-sm text-gray-300 mt-1">{error}</p>
            </div>
          </div>
        )}

        <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg p-6">
          <CalendarErrorBoundary>
            {isLoading ? (
              <CalendarSkeleton />
            ) : events.length === 0 ? (
              <div className="min-h-[400px] flex items-center justify-center">
                <div className="text-center p-8">
                  <p className="text-gray-400 mb-4">No events found</p>
                  <button
                    onClick={handleRefresh}
                    className="flex items-center gap-2 px-4 py-2 bg-[#39FF14] text-black rounded-md hover:bg-[#32CC11] transition-all mx-auto"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Refresh calendar
                  </button>
                </div>
              </div>
            ) : (
              <FullCalendar {...calendarOptions} />
            )}
          </CalendarErrorBoundary>
        </div>
      </div>
    </div>
  );
};