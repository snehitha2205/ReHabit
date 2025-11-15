import React from "react";

export default function HeaderHybrid({ total = 0, doneToday = 0, xp = 0, onDateSelect }) {

  const getLast7Days = () => {
    const days = [];
    const today = new Date();

    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(today.getDate() - i);
      days.push(d);
    }

    return days;
  };

  const weekDays = getLast7Days();
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <header className="hybrid-header">
      <div className="week-strip">
        {weekDays.map((date, i) => {
          const isToday = i === 6;
          const dateKey = date.toISOString().slice(0, 10);

          return (
            <div
              key={i}
              className={`week-day ${isToday ? "active" : ""}`}
              onClick={() => onDateSelect(dateKey)}
            >
              <div className="wd-name">{dayNames[date.getDay()]}</div>
              <div className="wd-date">{date.getDate()}</div>
              <div className="wd-dot" />
            </div>
          );
        })}
      </div>
    </header>
  );
}
