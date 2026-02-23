import React, { useState, useCallback, Suspense, lazy } from "react";
import { ErrorBoundary } from "./ErrorBoundary";

const WatchlistRemote = lazy(() => import("watchlistApp/App"));
const QuoteRemote = lazy(() => import("quoteApp/App"));
const OrdersRemote = lazy(() => import("ordersApp/App"));

function App() {
  const [activeSymbol, setActiveSymbol] = useState("AAPL");
  const [lastEvent, setLastEvent] = useState(null);
  const [orderHistory, setOrderHistory] = useState([]);

  const publishEvent = useCallback((event) => {
    setLastEvent(event);
  }, []);

  const addOrderToHistory = useCallback((order) => {
    setOrderHistory((prev) => [...prev, order]);
  }, []);

  const remoteProps = {
    activeSymbol,
    setActiveSymbol,
    publishEvent,
    addOrderToHistory,
  };

  return (
    <div style={{ fontFamily: "sans-serif", maxWidth: 900, margin: "0 auto", padding: 16 }}>
      <header style={{ borderBottom: "2px solid #333", paddingBottom: 8, marginBottom: 16 }}>
        <h1>Mini Trading Desk (Host)</h1>
      </header>

      <section style={{ marginBottom: 16 }}>
        <strong>Active Symbol:</strong> {activeSymbol}
      </section>

      <section style={{ marginBottom: 16 }}>
        <strong>Last Event:</strong>
        <pre style={{ background: "#f5f5f5", padding: 8, fontSize: 12, overflow: "auto" }}>
          {lastEvent ? JSON.stringify(lastEvent, null, 2) : "—"}
        </pre>
      </section>

      <section style={{ marginBottom: 16 }}>
        <strong>Order History:</strong>
        <ul style={{ margin: "4px 0", paddingLeft: 20 }}>
          {orderHistory.length === 0
            ? "—"
            : orderHistory.map((o) => (
                <li key={o.id}>
                  {o.side} {o.qty} {o.symbol} @ {new Date(o.timestamp).toLocaleTimeString()}
                </li>
              ))}
        </ul>
      </section>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
        <ErrorBoundary fallbackMessage="Watchlist remote failed to load.">
          <Suspense fallback={<div>Loading Watchlist…</div>}>
            <WatchlistRemote {...remoteProps} />
          </Suspense>
        </ErrorBoundary>
        <ErrorBoundary fallbackMessage="Quote remote failed to load.">
          <Suspense fallback={<div>Loading Quote…</div>}>
            <QuoteRemote {...remoteProps} />
          </Suspense>
        </ErrorBoundary>
        <ErrorBoundary fallbackMessage="Orders remote failed to load.">
          <Suspense fallback={<div>Loading Orders…</div>}>
            <OrdersRemote {...remoteProps} />
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
}

export default App;
