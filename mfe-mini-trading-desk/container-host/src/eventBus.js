/**
 * Simple in-memory event bus (publish/subscribe).
 */
const listeners = new Map();

export function subscribe(eventType, callback) {
  if (!listeners.has(eventType)) {
    listeners.set(eventType, []);
  }
  listeners.get(eventType).push(callback);
  return () => {
    const fns = listeners.get(eventType).filter((fn) => fn !== callback);
    if (fns.length) listeners.set(eventType, fns);
    else listeners.delete(eventType);
  };
}

export function publish(eventType, payload) {
  const fns = listeners.get(eventType);
  if (fns) {
    fns.forEach((fn) => fn({ type: eventType, payload }));
  }
}
