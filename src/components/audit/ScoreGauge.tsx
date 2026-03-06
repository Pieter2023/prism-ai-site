import { motion } from 'framer-motion';

interface ScoreGaugeProps {
  score: number;
  size?: number;
  label?: string;
}

function getColor(score: number): string {
  if (score < 30) return '#ef4444';
  if (score < 60) return '#eab308';
  return '#22c55e';
}

function getLabel(score: number): string {
  if (score < 25) return 'Getting Started';
  if (score < 45) return 'Emerging';
  if (score < 65) return 'Developing';
  if (score < 80) return 'Advanced';
  return 'AI-Ready';
}

export default function ScoreGauge({ score, size = 160, label }: ScoreGaugeProps) {
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const color = getColor(score);
  const center = size / 2;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          {/* Background track */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth={strokeWidth}
          />
          {/* Score arc */}
          <motion.circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ filter: `drop-shadow(0 0 8px ${color}40)` }}
          />
        </svg>
        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            className="text-3xl font-bold"
            style={{ color }}
            key={score}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            {score}
          </motion.span>
          <span className="text-xs text-slate-500 mt-0.5">/ 100</span>
        </div>
      </div>
      <span className="text-sm font-medium text-slate-300">
        {label || getLabel(score)}
      </span>
    </div>
  );
}
