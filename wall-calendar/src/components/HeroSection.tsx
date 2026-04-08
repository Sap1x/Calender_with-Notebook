import React from 'react';
import { format } from 'date-fns';

interface HeroSectionProps {
  currentMonth: Date;
}

export function HeroSection({ currentMonth }: HeroSectionProps) {
  const monthString = format(currentMonth, 'MMMM yyyy');
  const monthIndex = currentMonth.getMonth(); // 0 = Jan, 11 = Dec
  
  // High-quality, real seasonal images from Unsplash
  const seasonalImages = [
    "1476820865390-c52aeebb9891", // Jan: Snowy forest road
    "1483664852095-d6cc68707022", // Feb: Winter mountains
    "1490750967868-88cb44cb6cb1", // Mar: Spring flowers
    "1465146344425-f00d5f5c8f07", // Apr: Cherry blossoms
    "1472214103451-9374bd1c798e", // May: Green mountain valley
    "1507525428034-b723cf961d3e", // Jun: Beautiful beach
    "1499678329028-101435549a4e", // Jul: Summer sunset
    "1500382017468-9049fed747ef", // Aug: Sunflowers
    "1477414348463-c0eb7f1359b6", // Sep: Autumn forest
    "1505691938895-1758d7feb511", // Oct: Fall trail
    "1479839672679-a4648ce52643", // Nov: Moody late autumn
    "1517299321609-52687d1bc9e3"  // Dec: Snowy trees
  ];

  // Specific Unsplash URL format
  const imageId = seasonalImages[monthIndex];
  const imageUrl = `https://images.unsplash.com/photo-${imageId}?q=80&w=1200&auto=format&fit=crop`;

  return (
    <div className="relative h-64 sm:h-72 w-full overflow-hidden shrink-0 group bg-gray-100">
      {/* Background Image with optional parallax feel */}
      <img
        key={imageUrl} // Forces image to re-render properly on month change
        src={imageUrl}
        alt={`Calendar header for ${monthString}`}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-[10s] ease-out group-hover:scale-105"
      />
      
      {/* Dark gradient overlay (bottom fade) */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
      
      {/* Month/Year Text overlay */}
      <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full z-10">
        <h2 className="text-white font-serif text-4xl md:text-5xl tracking-wide font-medium drop-shadow-md">
          {format(currentMonth, 'MMMM')}
        </h2>
        <p className="text-white/80 font-sans text-xl md:text-2xl mt-1 tracking-widest font-light">
          {format(currentMonth, 'yyyy')}
        </p>
      </div>
    </div>
  );
}
