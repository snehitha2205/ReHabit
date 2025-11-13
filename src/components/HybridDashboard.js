import React, { useEffect, useState } from "react";
import HeaderHybrid from "./HeaderHybrid";
import HabitCardHybrid from "./HabitCardHybrid";
import BottomNavHybrid from "./BottomNavHybrid";
import AddHabitModalHybrid from "./AddHabitModalHybrid";
import { SAMPLE_HABITS, uid, todayKey } from "../utils";
import "./dashboard.css"
export default function HybridDashboard() {
  const [habits, setHabits] = useState(() => {
    try {
      const raw = localStorage.getItem("hybrid_habits_v1");
      return raw ? JSON.parse(raw) : SAMPLE_HABITS;
    } catch { return SAMPLE_HABITS; }
  });
  const [xp, setXp] = useState(() => Number(localStorage.getItem("hybrid_xp_v1") || 0));
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [selectedDate, setSelectedDate] = useState(todayKey());

  useEffect(()=> localStorage.setItem("hybrid_habits_v1", JSON.stringify(habits)), [habits]);
  useEffect(()=> localStorage.setItem("hybrid_xp_v1", String(xp)), [xp]);

  function addHabit(payload) {
    setHabits(s => [{ id: uid("h"), ...payload }, ...s]);
  }
  function updateHabit(id, updates) {
    setHabits(s => s.map(h => h.id===id ? { ...h, ...updates } : h));
  }
  function removeHabit(id) {
    setHabits(s => s.filter(h => h.id !== id));
  }

  function markHabit(habitId, date, status) {
    setHabits(s => s.map(h => {
      if (h.id !== habitId) return h;
      const history = { ...h.history, [date]: status };
      const xpGain = status === "done" ? 10 : status === "partial" ? 4 : 0;
      if (xpGain) setXp(x => x + xpGain);
      return { ...h, history, xp: (h.xp || 0) + xpGain };
    }));
  }

  function addNote(habitId, date, text) {
    setHabits(s => s.map(h => h.id===habitId ? { ...h, notes: { ...h.notes, [date]: text } } : h));
  }

  const total = habits.length;
  const doneToday = habits.filter(h => h.history?.[selectedDate] === "done").length;

  return (
    <div className="hybrid-root">
      <HeaderHybrid total={total} doneToday={doneToday} xp={xp} />
      <main className="hybrid-main">
        <section className="habits-column">
          {habits.length === 0 && (
            <div className="empty-card">
              <div className="mascot">🤖</div>
              <p>Tap the <span className="plus-inline">+</span> button to add your first habit.</p>
            </div>
          )}

          <div className="cards-grid">
            {habits.map(h => (
              <HabitCardHybrid
                key={h.id}
                habit={h}
                date={selectedDate}
                onMark={(date,status)=>markHabit(h.id,date,status)}
                onAddNote={(date,txt)=>addNote(h.id,date,txt)}
                onEdit={()=>{ setEditing(h); setShowModal(true); }}
                onRemove={()=>removeHabit(h.id)}
              />
            ))}
          </div>
        </section>

        <aside className="right-column">
          <div className="panel small">
            <div className="panel-row">
              <div>
                <div className="muted">Streaks</div>
                <div className="stat-strong">—</div>
              </div>
              <div>
                <div className="muted">Level</div>
                <div className="stat-strong">Lvl {Math.floor(xp/100)+1}</div>
              </div>
            </div>
            <div className="muted" style={{marginTop:12}}>Quick tips</div>
            <ul className="tips">
              <li>Keep sessions small — consistency wins.</li>
              <li>Use the Pomodoro for focus sessions.</li>
            </ul>
          </div>
        </aside>
      </main>

      <button className="fab" onClick={() => { setEditing(null); setShowModal(true); }}>+</button>

      <BottomNavHybrid />

      {showModal && (
        <AddHabitModalHybrid
          edit={editing}
          onClose={() => { setShowModal(false); setEditing(null); }}
          onSave={(payload) => {
            if (editing) updateHabit(editing.id, payload); else addHabit(payload);
            setShowModal(false); setEditing(null);
          }}
        />
      )}
    </div>
  );
}
