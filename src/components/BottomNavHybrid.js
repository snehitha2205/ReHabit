import React from "react";

export default function BottomNavHybrid() {
  return (
    <nav className="bottom-nav">
      <div className="nav-item active"><span className="icon">🏠</span><span className="label">Home</span></div>
      <div className="nav-item"><span className="icon">📅</span><span className="label">Calendar</span></div>
      <div className="nav-item"><span className="icon">📖</span><span className="label">Journal</span></div>
      <div className="nav-item"><span className="icon">⚙️</span><span className="label">Settings</span></div>
    </nav>
  );
}
