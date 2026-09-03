import React from 'react';
import { StatRadar } from '../types';

interface RadarChartProps {
  stats: StatRadar;
  color?: string;
  size?: number;
}

export const RadarChart: React.FC<RadarChartProps> = ({
  stats,
  color = '#f59e0b',
  size = 260
}) => {
  const axes = [
    { label: '战力爆发', key: 'power', val: stats.power },
    { label: '摸鱼松弛', key: 'chill', val: stats.chill },
    { label: '精神SAN值', key: 'sanity', val: stats.sanity },
    { label: '反骨叛逆', key: 'rebellion', val: stats.rebellion },
    { label: '恋爱脑', key: 'romance', val: stats.romance },
    { label: '智力策略', key: 'wisdom', val: stats.wisdom }
  ];

  const numAxes = axes.length;
  const radius = (size - 70) / 2;
  const center = size / 2;
  const angleSlice = (Math.PI * 2) / numAxes;

  // Concentric levels
  const levels = [0.25, 0.5, 0.75, 1];

  // Polygon points
  const points = axes.map((axis, i) => {
    const angle = i * angleSlice - Math.PI / 2;
    const r = (radius * axis.val) / 100;
    const x = center + Math.cos(angle) * r;
    const y = center + Math.sin(angle) * r;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="relative flex flex-col items-center justify-center">
      <svg width={size} height={size} className="overflow-visible">
        {/* Background Grid Polygons */}
        {levels.map((level, lvlIdx) => {
          const gridPoints = Array.from({ length: numAxes }).map((_, i) => {
            const angle = i * angleSlice - Math.PI / 2;
            const r = radius * level;
            const x = center + Math.cos(angle) * r;
            const y = center + Math.sin(angle) * r;
            return `${x},${y}`;
          }).join(' ');

          return (
            <polygon
              key={lvlIdx}
              points={gridPoints}
              fill={lvlIdx === levels.length - 1 ? 'rgba(28, 25, 23, 0.6)' : 'none'}
              stroke="rgba(120, 113, 108, 0.25)"
              strokeWidth="1"
              strokeDasharray={lvlIdx < levels.length - 1 ? '2 2' : undefined}
            />
          );
        })}

        {/* Axes lines */}
        {axes.map((_, i) => {
          const angle = i * angleSlice - Math.PI / 2;
          const x = center + Math.cos(angle) * radius;
          const y = center + Math.sin(angle) * radius;
          return (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={x}
              y2={y}
              stroke="rgba(120, 113, 108, 0.3)"
              strokeWidth="1"
            />
          );
        })}

        {/* Value Polygon with animation */}
        <polygon
          points={points}
          fill={`${color}33`}
          stroke={color}
          strokeWidth="2.5"
          className="transition-all duration-700 ease-out"
        />

        {/* Value Points */}
        {axes.map((axis, i) => {
          const angle = i * angleSlice - Math.PI / 2;
          const r = (radius * axis.val) / 100;
          const x = center + Math.cos(angle) * r;
          const y = center + Math.sin(angle) * r;
          return (
            <g key={i} className="transition-all duration-700 ease-out">
              <circle
                cx={x}
                cy={y}
                r="4"
                fill="#ffffff"
                stroke={color}
                strokeWidth="2"
              />
            </g>
          );
        })}

        {/* Labels */}
        {axes.map((axis, i) => {
          const angle = i * angleSlice - Math.PI / 2;
          const labelDist = radius + 22;
          const x = center + Math.cos(angle) * labelDist;
          const y = center + Math.sin(angle) * labelDist;

          return (
            <text
              key={i}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="central"
              className="text-[11px] font-medium fill-stone-300 select-none font-sans"
            >
              {axis.label}
              <tspan className="text-[10px] fill-amber-400 font-bold" dx="3">
                {axis.val}
              </tspan>
            </text>
          );
        })}
      </svg>
    </div>
  );
};
