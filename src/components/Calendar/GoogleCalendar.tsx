import React from 'react';

interface GoogleCalendarProps {
  className?: string;
}

export const GoogleCalendar: React.FC<GoogleCalendarProps> = ({ className }) => {
  return (
    <div className={`calendar-container w-full ${className}`}>
      <div className="relative pb-[75%] h-0 overflow-hidden rounded-lg shadow-lg">
        <iframe 
          src="https://calendar.google.com/calendar/embed?src=3e3db8e1e0e6dd57cc812495e53481d14d14c254c69895e11b436ad277385ce5%40group.calendar.google.com&ctz=America%2FNew_York"
          className="absolute top-0 left-0 w-full h-full border-0"
          frameBorder="0"
          scrolling="no"
          title="Google Calendar"
          loading="lazy"
        />
      </div>
    </div>
  );
};