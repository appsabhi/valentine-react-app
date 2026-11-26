import { useEffect, useRef, useState } from "react";
import FloatingHearts from "./FloatingHearts";
import {
  EnvelopeIcon,
  HeartCrackIcon,
  HeartIcon,
  ReplayIcon,
  RingIcon,
  SparkleIcon,
} from "./Icons";
import "./Proposal.css";

// Personalise with ?to=Name&from=Name in the URL.
const params = new URLSearchParams(window.location.search);
const TO = (params.get("to") || "").trim().slice(0, 30);
const FROM = (params.get("from") || "").trim().slice(0, 30);

// The "Broken Love Meter": every No makes it go UP, until it overflows.
const METER = [
  { level: 0, label: "Love meter: waiting for your answer..." },
  { level: 30, label: "Interesting choice... 🤔" },
  { level: 65, label: "Uh oh, it's going up 👀" },
  { level: 99, label: "🔔 BEEP BEEP! Meter overheating 💦" },
  { level: 150, label: "💥 METER OVERLOADED 💥" },
];
const MAX_NO = METER.length - 1;
const HEARTBEAT = ["1.3s", "1s", "0.6s", "0.35s", "0.25s"];

const BURST_COLORS = ["#ff2e63", "#ff8fab", "#ffffff", "#ffc2d1", "#ff4d79"];

function makeBurst() {
  return Array.from({ length: 40 }, (_, i) => {
    const angle = (Math.PI * 2 * i) / 40 + Math.random() * 0.3;
    const distance = 120 + Math.random() * 260;
    return {
      id: i,
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance,
      size: 14 + Math.random() * 22,
      delay: Math.random() * 0.25,
      rotate: Math.random() * 360 - 180,
      color: BURST_COLORS[i % BURST_COLORS.length],
    };
  });
}

function HeartBurst({ items }) {
  return (
    <div className="burst" aria-hidden="true">
      {items.map((b) => (
        <span
          key={b.id}
          style={{
            color: b.color,
            "--x": `${b.x}px`,
            "--y": `${b.y}px`,
            "--r": `${b.rotate}deg`,
            animationDelay: `${b.delay}s`,
          }}
        >
          <HeartIcon size={b.size} />
        </span>
      ))}
    </div>
  );
}

function Proposal() {
  const [stage, setStage] = useState("letter"); // letter -> ask -> yes
  const [noCount, setNoCount] = useState(0);
  const [burst, setBurst] = useState([]);
  const [showError, setShowError] = useState(false);
  const [dialogNudge, setDialogNudge] = useState(0);
  const errorTimer = useRef(null);

  useEffect(() => () => clearTimeout(errorTimer.current), []);

  const sayNo = () => {
    if (noCount >= MAX_NO) return;
    const next = noCount + 1;
    setNoCount(next);
    if (next === MAX_NO) {
      // Meter explodes, then the fake error pops up.
      setBurst(makeBurst());
      errorTimer.current = setTimeout(() => setShowError(true), 1100);
    }
  };

  const sayYes = () => {
    clearTimeout(errorTimer.current);
    setShowError(false);
    setBurst(makeBurst());
    setStage("yes");
  };

  const replay = () => {
    clearTimeout(errorTimer.current);
    setStage("letter");
    setNoCount(0);
    setShowError(false);
    setBurst([]);
  };

  const meter = METER[noCount];
  const overloaded = noCount >= MAX_NO;
  const grow = 1 + noCount * 0.1;

  return (
    <main className="scene">
      <FloatingHearts />

      {stage === "letter" && (
        <section className="card card-letter" key="letter">
          <div className="envelope-wrap">
            <EnvelopeIcon size={120} className="envelope" />
          </div>
          <p className="eyebrow">
            <SparkleIcon size={14} /> A little something for you <SparkleIcon size={14} />
          </p>
          <h1 className="title">
            {TO ? `${TO}, you've` : "You've"} got a love letter
          </h1>
          <button type="button" className="btn btn-yes" onClick={() => setStage("ask")}>
            <HeartIcon size={18} />
            <span>Open it</span>
          </button>
        </section>
      )}

      {stage === "ask" && (
        <>
          {overloaded && <HeartBurst items={burst} />}

          <section className="card card-ask" key="ask">
            <div className="badge">
              <HeartIcon size={14} /> February 14
            </div>
            <HeartIcon
              size={72}
              className="beating-heart"
              style={{ animationDuration: HEARTBEAT[noCount] }}
            />
            <h1 className="title">
              {TO ? `${TO}, will you` : "Will you"} be my Valentine?
            </h1>

            <div className={`meter meter-${noCount}`}>
              <div className="meter-head">
                <span className="meter-name">
                  <HeartIcon size={14} /> Love meter
                </span>
                <span className="meter-value" key={noCount}>
                  {meter.level}%
                </span>
              </div>
              <div
                className="meter-track"
                role="meter"
                aria-label="Love meter"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={meter.level}
              >
                <div className="meter-fill" style={{ width: `${Math.min(meter.level, 100)}%` }} />
                {noCount === 3 && <span className="meter-sweat" aria-hidden="true">💦</span>}
              </div>
              <p className="meter-label" aria-live="polite">
                {meter.label}
              </p>
            </div>

            <div className="buttons">
              <button
                type="button"
                className="btn btn-yes"
                style={{ "--grow": grow }}
                onClick={sayYes}
              >
                <HeartIcon size={18} />
                <span>Yes</span>
              </button>
              <button
                type="button"
                className="btn btn-no"
                key={noCount}
                onClick={sayNo}
                disabled={overloaded}
              >
                <HeartCrackIcon size={18} />
                <span>No</span>
              </button>
            </div>

            <p className="terms">*By clicking No, you agree to say Yes.</p>
          </section>

          {showError && (
            <div className="error-overlay">
              <div
                className="error-dialog"
                role="alertdialog"
                aria-labelledby="error-title"
                aria-describedby="error-text"
                key={dialogNudge}
              >
                <div className="error-titlebar">
                  <span>Heart.exe</span>
                  <button
                    type="button"
                    className="error-close"
                    aria-label="Close (nice try)"
                    onClick={() => setDialogNudge((n) => n + 1)}
                  >
                    ✕
                  </button>
                </div>
                <div className="error-body">
                  <span className="error-icon" aria-hidden="true">⚠️</span>
                  <div>
                    <p className="error-code" id="error-title">ERROR 404</p>
                    <p className="error-text" id="error-text">
                      'No' not found in my heart.
                    </p>
                    {dialogNudge > 0 && <p className="error-nope">Closing is not an option either 😏</p>}
                  </div>
                </div>
                <div className="error-actions">
                  <button type="button" className="btn btn-yes" onClick={sayYes} autoFocus>
                    <HeartIcon size={16} />
                    <span>OK, Yes</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {stage === "yes" && (
        <>
          <HeartBurst items={burst} />

          <section className="card card-yes" key="yes">
            <div className="ring-wrap">
              <span className="ring-glow" />
              <RingIcon size={84} className="ring" />
            </div>
            <h1 className="title">Yayyy! {TO ? `${TO} said yes!` : "You said yes!"}</h1>
            <p className="message">
              You just made my Valentine's Day the most special one ever. I can't wait to
              make a thousand more memories with you.
            </p>
            {noCount > 0 && (
              <p className="footnote">
                Every No only filled my heart more. Final love meter reading:{" "}
                {METER[noCount].level}% 💖
              </p>
            )}
            <p className="signature">
              Forever yours{FROM ? `, ${FROM}` : ""}
              <HeartIcon size={18} />
            </p>
            <button type="button" className="btn btn-ghost" onClick={replay}>
              <ReplayIcon size={16} />
              <span>Play again</span>
            </button>
          </section>
        </>
      )}
    </main>
  );
}

export default Proposal;
