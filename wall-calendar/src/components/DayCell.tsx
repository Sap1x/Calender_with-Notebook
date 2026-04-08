import React from 'react';
import { format, isWeekend } from 'date-fns';
import { cn } from '@/lib/utils';

export interface DayCellProps {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  isStart: boolean;
  isEnd: boolean;
  inRange: boolean;
  onClick: (date: Date) => void;
  onMouseEnter: (date: Date) => void;
}

export function DayCell({
  date,
  isCurrentMonth,
  isToday,
  isStart,
  isEnd,
  inRange,
  onClick,
  onMouseEnter,
}: DayCellProps) {
  const isWknd = isWeekend(date);

  return (
    <div
      className="relative flex items-center justify-center h-12 w-full p-1"
      onMouseEnter={() => onMouseEnter(date)}
    >
      {/* Soft highlighted background for dates in-between start and end */}
      {inRange && (
        <div 
          className={cn(
            "absolute inset-y-1 bg-primary-light z-0 transition-all duration-200",
            isStart ? "left-1/2 right-0" : isEnd ? "left-0 right-1/2" : "inset-x-0"
          )}
        />
      )}

      {/* Button for the day cell */}
      <button
        onClick={() => onClick(date)}
        disabled={!isCurrentMonth}
        className={cn(
          "relative z-10 w-10 h-10 flex items-center justify-center rounded-full text-sm font-medium transition-all duration-200 ease-in-out font-sans outline-none",
          // Base visible state
          isCurrentMonth ? "hover:scale-110 hover:shadow-sm" : "opacity-0 cursor-default",
          
          // Selection styles
          (isStart || isEnd) ? "bg-primary text-white shadow-md scale-105" : "",
          
          // Current Month styles but not selected
          (isCurrentMonth && !isStart && !isEnd) ? "hover:bg-gray-100 hover:text-gray-900" : "",
          
          // Weekend style
          (isCurrentMonth && isWknd && !isStart && !isEnd && !inRange) ? "text-gray-400" : "",
          (!isCurrentMonth || (!isWknd && !isStart && !isEnd && !inRange)) ? "text-gray-700" : "",
          
          // Today indicator
          (isToday && !isStart && !isEnd) ? "ring-1 ring-primary text-primary bg-white" : ""
        )}
      >
        {isCurrentMonth ? format(date, 'd') : ''}
      </button>
    </div>
  );
}
