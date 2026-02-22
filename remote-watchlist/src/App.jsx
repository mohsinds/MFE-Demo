import React, { useState } from "react";

const DEFAULT_SYMBOLS = ["AAPL", "MSFT", "NVDA"];

export default function App({ activeSymbol, setActiveSymbol, publishEvent }) {
  const [symbols, setSymbols] = useState(DEFAULT_SYMBOLS);
  const [newSymbol, setNewSymbol] = useState("");

  const handleSelect = (symbol) => {
    if (typeof setActiveSymbol === "function") setActiveSymbol(symbol);
    if (typeof publishEvent === "function") {
      publishEvent({ type: "SYMBOL_SELECTED", payload: { symbol } });
    }
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const s = newSymbol.trim().toUpperCase();
    if (s && !symbols.includes(s)) {
      setSymbols((prev) => [...prev, s]);
      setNewSymbol("");
    }
  };

  return (
    <div style={{ border: "1px solid #ccc", padding: 12, borderRadius: 4 }}>
      <h3 style={{ margin: "0 0 8px 0" }}>Watchlist</h3>
      <ul style={{ listStyle: "none", padding: 0, margin: "8px 0" }}>
        {symbols.map((s) => (
          <li key={s} style={{ marginBottom: 4 }}>
            <button
              type="button"
              onClick={() => handleSelect(s)}
              style={{
                width: "100%",
                textAlign: "left",
                padding: "6px 8px",
                cursor: "pointer",
                background: activeSymbol === s ? "#e0f0ff" : "#f5f5f5",
                border: "1px solid #ddd",
              }}
            >
              {s}
            </button>
          </li>
        ))}
      </ul>
      <form onSubmit={handleAdd} style={{ display: "flex", gap: 4, marginTop: 8 }}>
        <input
          type="text"
          value={newSymbol}
          onChange={(e) => setNewSymbol(e.target.value)}
          placeholder="Add symbol"
          style={{ flex: 1, padding: "4px 8px" }}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}
