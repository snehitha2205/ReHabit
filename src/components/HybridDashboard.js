import React, { useEffect, useState } from "react";
import axios from "axios";
import HeaderHybrid from "./HeaderHybrid";
import BottomNavHybrid from "./BottomNavHybrid";
import AddHabit from "./AddHabit";
import "./hybrid.css";

function uid(prefix = "id") {
  return prefix + Math.random().toString(36).slice(2, 9);
}

function todayKey(date = new Date()) {
  return date.toISOString().slice(0, 10);
}

export default function HybridDashboard() {
  const [habits, setHabits] = useState([]);
  const [xp, setXp] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [selectedDate, setSelectedDate] = useState(todayKey());

  useEffect(() => {
    axios.get('http://localhost:5000/api/habits')
      .then(response => setHabits(response.data))
      .catch(error => console.error("Error fetching habits: ", error));
  }, []);

  useEffect(() => {
    if (showModal) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
  }, [showModal]);

  const addHabit = (newHabit) => {
    axios.post('http://localhost:5000/api/habits', newHabit)
      .then(response => {
        setHabits(prev => [...prev, response.data]);
        setShowModal(false);
      })
      .catch(error => {
        alert("Error adding habit!");
        console.error(error);
      });
  };

  const updateHabit = (id, updates) => {
    axios.put(`http://localhost:5000/api/habits/${id}`, updates)
      .then(response => {
        setHabits(prev => prev.map(h => h._id === id ? response.data : h));
        setShowModal(false);
        setEditing(null);
      })
      .catch(error => {
        alert("Error updating habit!");
        console.error(error);
      });
  };

  const removeHabit = (id) => {
    axios.delete(`http://localhost:5000/api/habits/${id}`)
      .then(() => {
        setHabits(prev => prev.filter(h => h._id !== id));
      })
      .catch(error => {
        alert("Error deleting habit!");
        console.error(error);
      });
  };

  const markHabit = (habitId, date, status) => {
    setHabits(s =>
      s.map(h =>
        h._id !== habitId
          ? h
          : {
              ...h,
              history: { ...h.history, [date]: status }
            }
      )
    );
  };

  const addNote = (habitId, date, text) => {
    setHabits(s =>
      s.map(h =>
        h._id === habitId
          ? { ...h, notes: { ...h.notes, [date]: text } }
          : h
      )
    );
  };

  function HabitCardHybrid({ habit, date, onMark, onAddNote, onEdit, onRemove }) {
    const [note, setNote] = useState(habit.notes?.[date] || "");
    const status = habit.history?.[date] || "";
    const completedCount = Object.values(habit.history || {}).filter(v => v === "done").length;
    const progressPct = Math.min(100, (completedCount / Math.max(1, 21)) * 100);

    return (
      <article className="habit-card">
        <div className="card-head">
          <div className="chip" style={{ background: habit.color || "#da746f" }} />
          <div className="card-title">
            <div className="hname">{habit.title || habit.habitName}</div>
            <div className="hmeta">{habit.category || "General"}</div>
          </div>
          <div className="card-actions">
            <button className="small ghost" onClick={onEdit}>Edit</button>
            <button className="small ghost danger" onClick={onRemove}>Del</button>
          </div>
        </div>
        <div className="card-body">
          <div className="controls">
            <button className={`btn ${status === "done" ? "done" : ""}`} onClick={() => onMark(date, "done")}>Done</button>
            <button className={`btn ${status === "partial" ? "partial" : ""}`} onClick={() => onMark(date, "partial")}>Partial</button>
            <button className={`btn ${status === "skipped" ? "skipped" : ""}`} onClick={() => onMark(date, "skipped")}>Skip</button>
          </div>
          <div className="progress-row">
            <div className="progress-bar-shell">
              <div className="progress-bar-fill" style={{ width: `${progressPct}%` }} />
            </div>
            <div className="progress-text">{completedCount} completions</div>
          </div>
          <div className="note-row">
            <input
              className="note-input"
              placeholder="Add note..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              onBlur={() => onAddNote(date, note)}
            />
          </div>
        </div>
      </article>
    );
  }

  const total = habits.length;
  const doneToday = habits.filter(h => h.history?.[selectedDate] === "done").length;

  return (
    <div className="hybrid-dashboard">
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
                  key={h._id || h.id || uid()}
                  habit={h}
                  date={selectedDate}
                  onMark={(date, status) => markHabit(h._id, date, status)}
                  onAddNote={(date, txt) => addNote(h._id, date, txt)}
                  onEdit={() => { setEditing(h); setShowModal(true); }}
                  onRemove={() => removeHabit(h._id)}
                />
              ))}
            </div>
          </section>
        </main>
        <button className="fab" onClick={() => { setEditing(null); setShowModal(true); }}>+</button>
        <BottomNavHybrid />

        {showModal && (
          <div className="modal-backdrop" tabIndex="-1">
            <div className="modal-card">
              <AddHabit
                onAddHabit={(payload) => {
                  if (editing) updateHabit(editing._id, payload);
                  else addHabit(payload);
                  setShowModal(false);
                  setEditing(null);
                }}
                onClose={() => { setShowModal(false); setEditing(null); }}
                edit={editing}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}