import React from 'react';
import { 
  startOfMonth, endOfMonth, startOfWeek, endOfWeek, 
  eachDayOfInterval, format, isSameMonth, isSameDay, 
  isWithinInterval, isAfter, isBefore 
} from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { DayCell } from './DayCell';

interface CalendarGridProps {
  currentMonth: Date;
  onMonthChange: (date: Date) => void;
  startDate: Date | null;
  endDate: Date | null;
  hoverDate: Date | null;
  setStartDate: (date: Date | null) => void;
  setEndDate: (date: Date | null) => void;
  setHoverDate: (date: Date | null) => void;
}

export function CalendarGrid({
  currentMonth, onMonthChange,
  startDate, endDate, hoverDate,
  setStartDate, setEndDate, setHoverDate
}: CalendarGridProps) {
  
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDateToRender = startOfWeek(monthStart, { weekStartsOn: 1 }); // Monday
  const endDateToRender = endOfWeek(monthEnd, { weekStartsOn: 1 }); // Sunday

  const daysInGrid = eachDayOfInterval({
    start: startDateToRender,
    end: endDateToRender
  });

  const handlePrevMonth = () => {
    const prev = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1);
    onMonthChange(prev);
  }

  const handleNextMonth = () => {
    const next = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1);
    onMonthChange(next);
  }

  const handleDayClick = (date: Date) => {
    if (!startDate || (startDate && endDate)) {
      // First click: set start date, reset end date
      setStartDate(date);
      setEndDate(null);
    } else if (startDate && !endDate) {
      // Second click
      if (isBefore(date, startDate)) {
        setStartDate(date);
      } else if (isSameDay(date, startDate)) {
        setStartDate(null);
        setHoverDate(null);
      } else {
        setEndDate(date);
      }
    }
  }

  const handleDayHover = (date: Date) => {
    if (startDate && !endDate) {
      setHoverDate(date);
    }
  }

  const checkInRange = (day: Date) => {
    if (startDate && endDate) {
      return isWithinInterval(day, { start: startDate, end: endDate }) && !isSameDay(day, startDate) && !isSameDay(day, endDate);
    }
    if (startDate && hoverDate && isAfter(hoverDate, startDate)) {
      return isWithinInterval(day, { start: startDate, end: hoverDate }) && !isSameDay(day, startDate) && !isSameDay(day, hoverDate);
    }
    return false;
  }

  const today = new Date();

  return (
    <div className="flex flex-col p-6 sm:p-8 bg-white h-full relative" onMouseLeave={() => setHoverDate(null)}>
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-serif text-2xl text-gray-800">
          {format(currentMonth, 'MMMM yyyy')}
        </h3>
        <div className="flex space-x-2">
          <button 
            onClick={handlePrevMonth}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary/50"
            aria-label="Previous month"
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            onClick={handleNextMonth}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary/50"
            aria-label="Next month"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Days of week row */}
      <div className="grid grid-cols-7 mb-2">
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
          <div key={day} className="text-center text-xs font-semibold text-gray-400 tracking-wider font-sans uppercase uppercase mb-2">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Days Grid */}
      <div className="grid grid-cols-7 gap-y-2 flex-1">
        {daysInGrid.map((day, idx) => {
          const isCurrMonth = isSameMonth(day, currentMonth);
          const isTdy = isSameDay(day, today);
          const isSt = !!startDate && isSameDay(day, startDate);
          const isEn = (!!endDate && isSameDay(day, endDate)) || (!!startDate && !endDate && !!hoverDate && isSameDay(day, hoverDate) && isAfter(hoverDate, startDate));
          const inRange = checkInRange(day);

          return (
            <DayCell
              key={idx}
              date={day}
              isCurrentMonth={isCurrMonth}
              isToday={isTdy}
              isStart={isSt}
              isEnd={isEn}
              inRange={inRange}
              onClick={handleDayClick}
              onMouseEnter={handleDayHover}
            />
          );
        })}
      </div>
    </div>
  );
}
