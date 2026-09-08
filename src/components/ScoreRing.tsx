"use client";

interface ScoreRingProps {
  score: number;
  size?: number;
  strokeWidth?: number;
  showLabel?: boolean;
}

export default function ScoreRing({
  score,
  size = 72,
  strokeWidth = 4,
  showLabel = true,
}: ScoreRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  const getColor = () => {
    if (score >= 90) return "#4ade80";
    if (score >= 75) return "#60a5fa";
    if (score >= 60) return "#facc15";
    return "#f87171";
  };

  const color = getColor();

  return (
    <div style={{ position: "relative", width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.04)"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="score-ring-track"
          style={{ filter: `drop-shadow(0 0 4px ${color}30)` }}
        />
      </svg>
      {showLabel && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              fontSize: size * 0.26,
              fontWeight: 700,
              color,
              letterSpacing: "-0.02em",
              lineHeight: 1,
            }}
          >
            {score}
          </span>
          {size >= 64 && (
            <span style={{ fontSize: "9px", color: "var(--text-muted)", fontWeight: 500, marginTop: "1px" }}>
              MATCH
            </span>
          )}
        </div>
      )}
    </div>
  );
}
