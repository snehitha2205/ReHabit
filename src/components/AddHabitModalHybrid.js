import React, { useState } from "react";

export default function AddHabitModalHybrid({ onClose, onSave, edit }) {
  const [title, setTitle] = useState(edit?.title || "");
  const [category, setCategory] = useState(edit?.category || "General");
  const [color, setColor] = useState(edit?.color || "#da746f");

  function submit(){
    if(!title.trim()) return;
    onSave({ title, category, color, history: edit?.history || {}, notes: edit?.notes || {}, xp: edit?.xp || 0 });
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={e=>e.stopPropagation()}>
        <h3>{edit ? "Edit Habit" : "Add Habit"}</h3>
        <div className="form">
          <input className="input" placeholder="Habit title" value={title} onChange={(e)=>setTitle(e.target.value)} />
          <input className="input" placeholder="Category" value={category} onChange={(e)=>setCategory(e.target.value)} />
          <div className="color-row">
            <button className={`color-swatch ${color==="#da746f"?"sel":""}`} style={{background:"#da746f"}} onClick={()=>setColor("#da746f")} />
            <button className={`color-swatch ${color==="#d6304c"?"sel":""}`} style={{background:"#d6304c"}} onClick={()=>setColor("#d6304c")} />
            <button className={`color-swatch ${color==="#1a1a1d"?"sel":""}`} style={{background:"#1a1a1d"}} onClick={()=>setColor("#1a1a1d")} />
          </div>
        </div>

        <div className="modal-actions">
          <button className="btn ghost" onClick={onClose}>Cancel</button>
          <button className="btn" onClick={submit}>Save</button>
        </div>
      </div>
    </div>
  );
}
