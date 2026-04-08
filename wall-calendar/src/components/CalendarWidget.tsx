'use client';

import React, { useState } from 'react';
import { HeroSection } from './HeroSection';
import { CalendarGrid } from './CalendarGrid';
import { NotesPanel } from './NotesPanel';

export function CalendarWidget() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [hoverDate, setHoverDate] = useState<Date | null>(null);

  const handleMonthChange = (newMonth: Date) => {
    setCurrentMonth(newMonth);
  };

  return (
    <div className="flex flex-col bg-white rounded-3xl overflow-hidden shadow-2xl ring-1 ring-black/5 max-w-5xl w-full mx-auto md:min-h-[800px] h-auto transition-all duration-300">
      <HeroSection currentMonth={currentMonth} />
      
      <div className="flex flex-col md:flex-row flex-1">
        <div className="w-full md:w-[40%] flex-shrink-0 border-b md:border-b-0">
          <NotesPanel currentMonth={currentMonth} />
        </div>
        
        <div className="w-full md:w-[60%] flex-shrink-0 bg-white">
          <CalendarGrid 
            currentMonth={currentMonth}
            onMonthChange={handleMonthChange}
            startDate={startDate}
            endDate={endDate}
            hoverDate={hoverDate}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            setHoverDate={setHoverDate}
          />
        </div>
      </div>
    </div>
  );
}
