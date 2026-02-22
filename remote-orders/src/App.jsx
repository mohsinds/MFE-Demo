import React, { useState } from "react";

let orderId = 1;
function nextId() {
  return String(orderId++);
}

export default function App({ activeSymbol, addOrderToHistory, publishEvent }) {
  const [side, setSide] = useState("BUY");
  const [qty, setQty] = useState(10);

  const handlePlace = () => {
    const order = {
      id: nextId(),
      symbol: activeSymbol || "—",
      side,
      qty: Number(qty) || 0,
      timestamp: Date.now(),
    };
    if (typeof addOrderToHistory === "function") addOrderToHistory(order);
    if (typeof publishEvent === "function") {
      publishEvent({ type: "ORDER_PLACED", payload: order });
    }
  };

  return (
    <div style={{ border: "1px solid #ccc", padding: 12, borderRadius: 4 }}>
      <h3 style={{ margin: "0 0 8px 0" }}>Orders</h3>
      <p style={{ margin: "4px 0" }}>
        <strong>Symbol:</strong> {activeSymbol || "—"}
      </p>
      <div style={{ marginBottom: 8 }}>
        <label>
          <input
            type="radio"
            name="side"
            checked={side === "BUY"}
            onChange={() => setSide("BUY")}
          />{" "}
          Buy
        </label>{" "}
        <label>
          <input
            type="radio"
            name="side"
            checked={side === "SELL"}
            onChange={() => setSide("SELL")}
          />{" "}
          Sell
        </label>
      </div>
      <div style={{ marginBottom: 8 }}>
        <label>
          Qty:{" "}
          <input
            type="number"
            min={1}
            value={qty}
            onChange={(e) => setQty(e.target.value)}
            style={{ width: 60 }}
          />
        </label>
      </div>
      <button type="button" onClick={handlePlace}>
        Place Order
      </button>
    </div>
  );
}
