"use client";

export function HeroSection() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-blue-950">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.3)_2px,transparent_2px),linear-gradient(90deg,rgba(0,0,0,0.3)_2px,transparent_2px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />
        <div className="absolute inset-0 bg-blue-950/90" />
      </div>

      <div className="relative z-10 text-center p-4">
        <h1 className="text-6xl font-bold text-white mb-6">
          Inspired by Genius
        </h1>
        <p className="text-2xl text-blue-200 max-w-3xl mx-auto">
          A tribute to Michael Scofield's brilliant mind and methodical approach
        </p>
      </div>
    </section>
  );
}