import React, { useState } from "react";
import { calcStreaks } from "../utils";

export default function HabitCardHybrid({ habit, date, onMark, onAddNote, onEdit, onRemove }) {
  const [note, setNote] = useState(habit.notes?.[date] || "");
  const status = habit.history?.[date] || "";
  const { current, longest } = calcStreaks(habit.history || {});
  const completedCount = Object.values(habit.history || {}).filter(v => v === "done").length;
  const progressPct = Math.min(100, (completedCount / Math.max(1, 21)) * 100);

  function handleFile(e){
    // placeholder - can implement photo proof reading if desired
  }

  return (
    <article className="habit-card">
      <div className="card-head">
        <div className="chip" style={{background:habit.color}} />
        <div className="card-title">
          <div className="hname">{habit.title}</div>
          <div className="hmeta">{habit.category} • Streak {current}</div>
        </div>

        <div className="card-actions">
          <button className="small ghost" onClick={onEdit}>Edit</button>
          <button className="small ghost danger" onClick={onRemove}>Del</button>
        </div>
      </div>

      <div className="card-body">
        <div className="controls">
          <button className={`btn ${status==="done"?"done":""}`} onClick={()=>onMark(date,"done")}>Done</button>
          <button className={`btn ${status==="partial"?"partial":""}`} onClick={()=>onMark(date,"partial")}>Partial</button>
          <button className={`btn ${status==="skipped"?"skipped":""}`} onClick={()=>onMark(date,"skipped")}>Skip</button>
        </div>

        <div className="progress-row">
          <div className="progress-bar-shell">
            <div className="progress-bar-fill" style={{width: `${progressPct}%`}} />
          </div>
          <div className="progress-text">{completedCount} completions</div>
        </div>

        <div className="note-row">
          <input
            className="note-input"
            placeholder="Add note..."
            value={note}
            onChange={(e)=>setNote(e.target.value)}
            onBlur={()=>onAddNote(date,note)}
          />
          <input type="file" accept="image/*" onChange={handleFile} />
        </div>
      </div>
    </article>
  );
}
