import React from "react";
import { calcStreaks } from "../utils";

export default function HabitCard({ habit, date, onMark, onAddNote, onAddPhoto, onEdit }) {
  const status = habit.history?.[date] || "";
  const { current, longest } = calcStreaks(habit.history || {});
  const photo = habit.photos?.[date];

  function handleFile(e) {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => onAddPhoto(habit.id, date, reader.result);
    reader.readAsDataURL(f);
  }

  return (
    <div className="habit-card">
      <div className="habit-row">
        <div className="habit-title">
          <div style={{ width: 10, height: 10, borderRadius: 4, background: habit.color }} />
          <div>
            <div style={{ fontWeight: 700 }}>{habit.title}</div>
            <div className="small-muted">{habit.category}</div>
          </div>
        </div>

        <div style={{ textAlign: "right" }}>
          <div className="small-muted">Streak: {current} • Longest: {longest}</div>
        </div>
      </div>

      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <div className="check-buttons">
          <button className={`btn ${status === "done" ? "btn-done" : "btn-ghost"}`} onClick={() => onMark(habit.id, date, "done")}>
            Done
          </button>
          <button className={`btn ${status === "partial" ? "btn-partial" : "btn-ghost"}`} onClick={() => onMark(habit.id, date, "partial")}>
            Partial
          </button>
          <button className={`btn ${status === "skipped" ? "btn-skip" : "btn-ghost"}`} onClick={() => onMark(habit.id, date, "skipped")}>
            Skip
          </button>
        </div>

        <div style={{ flex: 1 }}>
          <input className="input-small" type="text" placeholder="Add a note" defaultValue={habit.notes?.[date] || ""} onBlur={(e) => onAddNote(habit.id, date, e.target.value)} />
        </div>

        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <label style={{ fontSize: 12 }} className="small-muted">Photo</label>
          <input type="file" accept="image/*" onChange={handleFile} />
          <button className="btn btn-ghost" onClick={onEdit}>Edit</button>
        </div>
      </div>

      {photo && (
        <div>
          <img src={photo} alt="proof" style={{ width: 200, height: 120, objectFit: "cover", borderRadius: 8, marginTop: 8, border: "1px solid rgba(0,0,0,0.06)" }} />
        </div>
      )}

      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
        <div className="small-muted">XP: {habit.xp || 0}</div>
        <div className="small-muted">id: {habit.id}</div>
      </div>
    </div>
  );
}
