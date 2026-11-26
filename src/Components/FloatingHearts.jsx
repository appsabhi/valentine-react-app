import { HeartIcon, SparkleIcon } from "./Icons";

const COLORS = ["#ffffff", "#ffd6e0", "#ff8fab", "#ff4d79", "#ffc2d1"];

// Generated once at load so the background stays stable between renders.
const ITEMS = Array.from({ length: 22 }, (_, i) => ({
  id: i,
  sparkle: i % 5 === 0,
  left: Math.random() * 100,
  size: 12 + Math.random() * 26,
  duration: 9 + Math.random() * 9,
  delay: -Math.random() * 18, // negative delay = already mid-flight on load
  sway: 20 + Math.random() * 40,
  opacity: 0.35 + Math.random() * 0.5,
  color: COLORS[i % COLORS.length],
}));

function FloatingHearts() {
  return (
    <div className="floating-hearts" aria-hidden="true">
      {ITEMS.map((h) => {
        const Icon = h.sparkle ? SparkleIcon : HeartIcon;
        return (
          <span
            key={h.id}
            style={{
              left: `${h.left}%`,
              color: h.color,
              opacity: h.opacity,
              animationDuration: `${h.duration}s`,
              animationDelay: `${h.delay}s`,
              "--sway": `${h.sway}px`,
            }}
          >
            <Icon size={h.size} />
          </span>
        );
      })}
    </div>
  );
}

export default FloatingHearts;
