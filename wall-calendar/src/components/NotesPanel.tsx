import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';

interface NotesPanelProps {
  currentMonth: Date;
}

export function NotesPanel({ currentMonth }: NotesPanelProps) {
  const [notes, setNotes] = useState('');
  const [isClient, setIsClient] = useState(false);
  
  const formattedMonth = format(currentMonth, 'yyyy-MM');
  const storageKey = `calendar-notes-${formattedMonth}`;

  useEffect(() => {
    // Ensuring localStorage is only accessed on client
    setIsClient(true);
    const savedNotes = localStorage.getItem(storageKey);
    if (savedNotes !== null) {
      setNotes(savedNotes);
    } else {
      setNotes('');
    }
  }, [storageKey]);

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setNotes(value);
    localStorage.setItem(storageKey, value);
  };

  return (
    <div className="h-full w-full bg-white relative flex flex-col pt-6 pb-6 px-6 sm:px-8 border-r border-[#e2e8f0]">
      <h3 className="font-serif text-xl text-gray-800 mb-4 sticky top-0 bg-white z-10 shrink-0">
        Notes
      </h3>
      
      {/* Lined paper texture wrapping the textarea */}
      <div className="flex-1 relative">
        <textarea
          value={isClient ? notes : ''}
          onChange={handleNotesChange}
          placeholder="Jot down priorities, events, or thoughts..."
          className="w-full h-full resize-none outline-none bg-transparent lined-paper leading-[32px] text-gray-700 text-[15px] p-0 font-sans transition-shadow focus:ring-opacity-50"
          style={{ paddingTop: '5px' }}
        />
      </div>
      
      {/* Dynamic corner fold/decoration (optional polish) */}
      <div className="absolute bottom-0 left-0 w-8 h-8 rounded-tr-xl bg-[#f8f7f4] border-t border-r border-gray-100 opacity-60" />
    </div>
  );
}
