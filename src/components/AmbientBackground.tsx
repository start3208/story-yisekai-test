import React, { useMemo } from 'react';

export const AmbientBackground: React.FC = () => {
  const stars = useMemo(() => {
    return Array.from({ length: 36 }).map((_, i) => ({
      id: i,
      left: `${(i * 17) % 100}%`,
      top: `${(i * 23) % 100}%`,
      size: (i % 3) + 1,
      opacity: (i % 5) * 0.15 + 0.2,
      duration: (i % 4) + 3,
      delay: (i % 5) * 0.7
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Deep gradient backing */}
      <div className="absolute inset-0 bg-radial from-stone-900/40 via-stone-950 to-stone-950" />

      {/* Atmospheric ambient orbs */}
      <div className="absolute -top-40 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 right-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/[0.03] rounded-full blur-3xl" />

      {/* Magic Runes & Subtle Grid */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #d97706 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }}
      />

      {/* Twinkling stars */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-amber-200 animate-pulse"
          style={{
            left: star.left,
            top: star.top,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animationDuration: `${star.duration}s`,
            animationDelay: `${star.delay}s`
          }}
        />
      ))}
    </div>
  );
};
