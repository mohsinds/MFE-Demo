import React, { useState, useEffect, useRef } from "react";

function randomDelta() {
  return (Math.random() - 0.5) * 2;
}

export default function App({ activeSymbol, publishEvent }) {
  const [price, setPrice] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const lastEmitRef = useRef(0);
  const QUOTE_TICK_THROTTLE_MS = 2000;

  useEffect(() => {
    if (!activeSymbol) return;
    const base = 100 + Math.random() * 200;
    setPrice(base);
    setLastUpdated(new Date());

    const id = setInterval(() => {
      setPrice((p) => {
        const next = Math.max(1, (p ?? base) + randomDelta());
        const now = Date.now();
        if (typeof publishEvent === "function" && now - lastEmitRef.current >= QUOTE_TICK_THROTTLE_MS) {
          lastEmitRef.current = now;
          publishEvent({ type: "QUOTE_TICK", payload: { symbol: activeSymbol, price: next } });
        }
        return next;
      });
      setLastUpdated(new Date());
    }, 500);

    return () => clearInterval(id);
  }, [activeSymbol, publishEvent]);

  return (
    <div style={{ border: "1px solid #ccc", padding: 12, borderRadius: 4 }}>
      <h3 style={{ margin: "0 0 8px 0" }}>Quote</h3>
      <p style={{ margin: "4px 0" }}>
        <strong>{activeSymbol || "—"}</strong>
      </p>
      <p style={{ margin: "4px 0", fontSize: 18 }}>
        {price != null ? `$${price.toFixed(2)}` : "—"}
      </p>
      <p style={{ margin: "4px 0", fontSize: 12, color: "#666" }}>
        Updated: {lastUpdated ? lastUpdated.toLocaleTimeString() : "—"}
      </p>
    </div>
  );
}
