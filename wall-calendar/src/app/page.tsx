import { CalendarWidget } from "@/components/CalendarWidget";

export default function Home() {
  return (
    <main className="min-h-screen p-4 sm:p-8 md:p-12 lg:p-24 flex items-center justify-center relative overflow-hidden">
      {/* Decorative background blob for premium aesthetic */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-[#f87171]/5 blur-[120px] pointer-events-none" />
      
      <div className="z-10 w-full relative perspective-[1200px]">
        <CalendarWidget />
      </div>
    </main>
  );
}
