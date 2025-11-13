export function uid(prefix = "id") {
  return prefix + Math.random().toString(36).slice(2, 9);
}
export function todayKey(date = new Date()) {
  return date.toISOString().slice(0, 10);
}
export function calcStreaks(history = {}) {
  const dates = Object.keys(history).sort();
  let current = 0, longest = 0;
  for (let i = dates.length - 1; i >= 0; i--) {
    if (history[dates[i]] === "done") current++; else { if (current>0) break; }
    longest = Math.max(longest, current);
  }
  let temp = 0;
  dates.forEach(d => { if (history[d] === "done") temp++; else temp = 0; longest = Math.max(longest, temp); });
  return { current, longest };
}
export const SAMPLE_HABITS = [
  { id: "h1", title: "Meditate", category: "Wellness", color: "#da746f", history: {}, notes: {}, xp: 0 },
  { id: "h2", title: "Read 30 min", category: "Learning", color: "#d6304c", history: {}, notes: {}, xp: 0 }
];
