'use client';

import { useEffect, useState } from 'react';

interface Bubble {
  id: number;
  size: number;
  left: number;
  duration: number;
  delay: number;
  color: string;
}

export function FloatingBubbles() {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);

  useEffect(() => {
    const colors = [
      'rgba(59, 130, 246, 0.3)',   // blue
      'rgba(6, 182, 212, 0.3)',    // cyan
      'rgba(139, 92, 246, 0.3)',   // violet
      'rgba(236, 72, 153, 0.3)',   // pink
      'rgba(34, 197, 94, 0.3)',    // green
      'rgba(251, 146, 60, 0.3)',   // orange
    ];

    const generatedBubbles: Bubble[] = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      size: Math.random() * 100 + 50,
      left: Math.random() * 100,
      duration: Math.random() * 10 + 15,
      delay: Math.random() * 5,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    setBubbles(generatedBubbles);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          className="absolute rounded-full blur-xl opacity-60"
          style={{
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            left: `${bubble.left}%`,
            bottom: '-100px',
            background: bubble.color,
            animation: `float ${bubble.duration}s ease-in-out ${bubble.delay}s infinite`,
          }}
        />
      ))}
      
      {/* Additional decorative elements */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-float-slow" />
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-br from-violet-500/20 to-pink-500/20 rounded-full blur-3xl animate-float-reverse" />
      <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-full blur-3xl animate-float" />
    </div>
  );
}
