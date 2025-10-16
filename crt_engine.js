// crt_engine.js — mock CRT strategy logic
export function generateMockSignals() {
  const symbols = ["XAUUSD", "US30"];
  const signals = symbols.map(symbol => {
    const type = Math.random() > 0.5 ? "BUY" : "SELL";
    return {
      id: Date.now() + Math.random(),
      symbol,
      type,
      payload: {
        level: (Math.random() * 1000 + 3000).toFixed(2),
        strength: (Math.random() * 100).toFixed(1)
      },
      ts: Date.now()
    };
  });
  return signals;
}
