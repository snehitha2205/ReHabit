import React from "react";

export default function HeaderHybrid({ total=0, doneToday=0, xp=0 }) {
  const days = ["Thu","Fri","Sat","Sun","Mon","Tue","Wed"];
  return (
    <header className="hybrid-header">
      <div className="header-top">
        <div className="left">
          <div className="greeting">Good Evening</div>
          <div className="title">Today</div>
        </div>
        <div className="right">
          <div className="xp-pill">XP {xp}</div>
        </div>
      </div>

      <div className="week-strip">
        {days.map((d,i)=>(
          <div key={i} className={`week-day ${i===6 ? "active" : ""}`}>
            <div className="wd-name">{d}</div>
            <div className="wd-date">{i+6}</div>
            <div className="wd-dot" />
          </div>
        ))}
      </div>
    </header>
  );
}
