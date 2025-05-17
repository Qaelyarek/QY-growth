import React, { useState } from 'react';
import { Calendar as CalendarIcon, List } from 'lucide-react';
import { GoogleCalendar } from '../components/Calendar/GoogleCalendar';
import { Schedule } from '../components/Schedule/Schedule';

export default function Calendar() {
  const [view, setView] = useState<'iframe' | 'interactive'>('iframe');

  return (
    <div className="min-h-screen bg-dark text-white font-mono py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CalendarIcon className="w-8 h-8 text-[#39FF14]" />
              <h1 className="text-3xl font-bold tracking-tight">Calendar</h1>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setView('iframe')}
                className={`px-4 py-2 rounded-md transition-all ${
                  view === 'iframe'
                    ? 'bg-[#39FF14] text-black'
                    : 'bg-black/30 text-white hover:bg-black/50'
                }`}
              >
                <CalendarIcon className="w-5 h-5" />
              </button>
              <button
                onClick={() => setView('interactive')}
                className={`px-4 py-2 rounded-md transition-all ${
                  view === 'interactive'
                    ? 'bg-[#39FF14] text-black'
                    : 'bg-black/30 text-white hover:bg-black/50'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
          <p className="mt-2 text-gray-400">
            View and manage your schedule in {view === 'iframe' ? 'standard' : 'interactive'} mode
          </p>
        </div>

        <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg">
          {view === 'iframe' ? (
            <div className="p-6">
              <GoogleCalendar />
            </div>
          ) : (
            <Schedule />
          )}
        </div>
      </div>
    </div>
  );
}