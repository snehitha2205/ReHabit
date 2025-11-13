// components/Calendar.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Calendar.css";

function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [habits, setHabits] = useState([]);
  const [dailyProgress, setDailyProgress] = useState({});
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const getAuthToken = () => {
    return localStorage.getItem('token');
  };

  const api = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: {
      'Authorization': `Bearer ${getAuthToken()}`
    }
  });

  useEffect(() => {
    if (user) {
      fetchHabits();
    }
  }, [user]);

  // Fixed: Proper date key generation
  const getDateKey = (date) => {
    // Use local date without timezone conversion
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const fetchHabits = () => {
    api.get('/habits')
      .then(response => {
        setHabits(response.data);
        calculateDailyProgress(response.data);
      })
      .catch(error => {
        console.error("Error fetching habits: ", error);
        if (error.response?.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          window.location.href = '/login';
        }
      });
  };

  const calculateDailyProgress = (habits) => {
    const progress = {};
    
    habits.forEach(habit => {
      Object.keys(habit.history || {}).forEach(dateKey => {
        if (!progress[dateKey]) {
          progress[dateKey] = {
            total: 0,
            done: 0,
            habits: []
          };
        }
        progress[dateKey].total++;
        if (habit.history[dateKey] === 'done') {
          progress[dateKey].done++;
        }
        progress[dateKey].habits.push({
          id: habit._id,
          name: habit.habitName,
          status: habit.history[dateKey],
          category: habit.category
        });
      });
    });
    
    setDailyProgress(progress);
  };

  const markHabitAsDone = (habitId, date) => {
    const dateKey = getDateKey(date);
    
    // Check if already marked today
    const habit = habits.find(h => h._id === habitId);
    if (habit?.history?.[dateKey] === 'done') {
      alert('This habit is already marked as done for today!');
      return;
    }

    api.put(`/habits/${habitId}`, { 
      history: { 
        ...(habit?.history || {}),
        [dateKey]: 'done'
      }
    })
    .then(response => {
      const updatedHabits = habits.map(h => 
        h._id === habitId ? response.data : h
      );
      setHabits(updatedHabits);
      calculateDailyProgress(updatedHabits);
      alert('Habit marked as done!');
    })
    .catch(error => {
      console.error("Error marking habit as done:", error);
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
    });
  };

  // Calendar functions
  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const isToday = (date) => {
    const today = new Date();
    return getDateKey(date) === getDateKey(today);
  };

  const isSelected = (date) => {
    return getDateKey(date) === getDateKey(selectedDate);
  };

  const getProgressForDate = (date) => {
    const dateKey = getDateKey(date);
    return dailyProgress[dateKey] || { total: 0, done: 0, habits: [] };
  };

  const getProgressPercentage = (date) => {
    const progress = getProgressForDate(date);
    return progress.total > 0 ? (progress.done / progress.total) * 100 : 0;
  };

  const getProgressColor = (percentage) => {
    if (percentage === 0) return '#e0e0e0';
    if (percentage < 33) return '#ff6b6b';
    if (percentage < 66) return '#ffd93d';
    if (percentage < 100) return '#6bcf7f';
    return '#4caf50';
  };

  const navigateMonth = (direction) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + direction, 1));
  };

  const generateCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const calendar = [];

    // Previous month days
    const prevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
    const daysInPrevMonth = getDaysInMonth(prevMonth);
    
    for (let i = firstDay - 1; i >= 0; i--) {
      const date = new Date(prevMonth.getFullYear(), prevMonth.getMonth(), daysInPrevMonth - i);
      calendar.push({ date, isCurrentMonth: false });
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
      calendar.push({ date, isCurrentMonth: true });
    }

    // Next month days
    const totalCells = 42; // 6 weeks
    const nextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
    
    for (let i = 1; calendar.length < totalCells; i++) {
      const date = new Date(nextMonth.getFullYear(), nextMonth.getMonth(), i);
      calendar.push({ date, isCurrentMonth: false });
    }

    return calendar;
  };

  const calendar = generateCalendar();
  const selectedDateProgress = getProgressForDate(selectedDate);
  const selectedDateKey = getDateKey(selectedDate);

  // Calculate weekly progress for graph - FIXED to use proper dates
  const getWeeklyProgress = () => {
    const weekDays = [];
    const today = new Date();
    
    // Start from 6 days ago to today
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const progress = getProgressForDate(date);
      weekDays.push({
        date: date.toLocaleDateString('en-US', { weekday: 'short' }),
        fullDate: getDateKey(date),
        percentage: progress.total > 0 ? (progress.done / progress.total) * 100 : 0,
        done: progress.done,
        total: progress.total
      });
    }
    
    return weekDays;
  };

  const weeklyProgress = getWeeklyProgress();

  // Debug: Log current state
  useEffect(() => {
    console.log('Selected Date:', selectedDate);
    console.log('Selected Date Key:', getDateKey(selectedDate));
    console.log('Today Key:', getDateKey(new Date()));
    console.log('Habits:', habits);
    console.log('Daily Progress:', dailyProgress);
  }, [selectedDate, habits, dailyProgress]);

  if (!user) {
    return (
      <div className="loading-container">
        <p>Please log in to view your calendar</p>
      </div>
    );
  }

  return (
    <div className="calendar-dashboard">
      <div className="calendar-root">
        {/* Header */}
        <div className="calendar-header">
          <div className="header-top">
            <div>
              <div className="greeting">Habit Calendar</div>
              <div className="title">Track Your Progress</div>
            </div>
            <div className="xp-pill">
              {selectedDateProgress.done}/{selectedDateProgress.total} Done
            </div>
          </div>
        </div>

        <main className="calendar-main">
          {/* Calendar Section */}
          <section className="calendar-section">
            <div className="calendar-nav">
              <button onClick={() => navigateMonth(-1)} className="nav-button">
                ‹
              </button>
              <h2>
                {currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}
              </h2>
              <button onClick={() => navigateMonth(1)} className="nav-button">
                ›
              </button>
            </div>

            <div className="calendar-grid">
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => (
                <div key={day} className="calendar-day-header">
                  {day}
                </div>
              ))}
              
              {calendar.map(({ date, isCurrentMonth }, index) => {
                const progress = getProgressForDate(date);
                const percentage = getProgressPercentage(date);
                const progressColor = getProgressColor(percentage);
                const isDateToday = isToday(date);
                const isDateSelected = isSelected(date);
                
                return (
                  <div
                    key={index}
                    className={`calendar-day ${!isCurrentMonth ? 'other-month' : ''} ${
                      isDateToday ? 'today' : ''
                    } ${isDateSelected ? 'selected' : ''}`}
                    onClick={() => setSelectedDate(date)}
                  >
                    <div className="day-number">{date.getDate()}</div>
                    {progress.total > 0 && (
                      <div className="day-progress">
                        <div 
                          className="progress-dot"
                          style={{ backgroundColor: progressColor }}
                        />
                        <div className="progress-text">
                          {progress.done}/{progress.total}
                        </div>
                      </div>
                    )}
                    {isDateToday && <div className="today-indicator">Today</div>}
                  </div>
                );
              })}
            </div>
          </section>

          {/* Stats & Habits Section */}
          <section className="stats-section">
            <div className="selected-date-card">
              <h3 className="date-title">
                {selectedDate.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  month: 'long', 
                  day: 'numeric',
                  year: 'numeric'
                })}
                {isToday(selectedDate) && <span className="today-badge">Today</span>}
              </h3>
              
              {/* Progress Stats */}
              <div className="progress-stats-grid">
                <div className="stat-card">
                  <div className="stat-value">{selectedDateProgress.total}</div>
                  <div className="stat-label">Total Habits</div>
                </div>
                <div className="stat-card">
                  <div className="stat-value">{selectedDateProgress.done}</div>
                  <div className="stat-label">Completed</div>
                </div>
                <div className="stat-card">
                  <div className="stat-value">
                    {selectedDateProgress.total > 0 
                      ? Math.round((selectedDateProgress.done / selectedDateProgress.total) * 100)
                      : 0
                    }%
                  </div>
                  <div className="stat-label">Completion</div>
                </div>
              </div>

              {/* Weekly Progress Graph */}
              <div className="graph-card">
                <h4>Weekly Progress</h4>
                <div className="bars-container">
                  {weeklyProgress.map((day, index) => (
                    <div key={index} className="bar-wrapper">
                      <div className="bar-label">{day.date}</div>
                      <div className="bar-container">
                        <div 
                          className="bar-fill"
                          style={{ 
                            height: `${day.percentage}%`,
                            backgroundColor: getProgressColor(day.percentage)
                          }}
                        />
                      </div>
                      <div className="bar-value">{day.done}/{day.total}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Daily Habits List */}
              <div className="habits-card">
                <h4>
                  {isToday(selectedDate) ? "Today's Habits" : "Habits for Selected Day"}
                  <span className="date-badge">{getDateKey(selectedDate)}</span>
                </h4>
                <div className="habits-list">
                  {habits.length === 0 ? (
                    <div className="no-habits">
                      <div className="mascot">📅</div>
                      <p>No habits yet. Add some habits to track!</p>
                    </div>
                  ) : (
                    habits.map(habit => {
                      const habitStatus = habit.history?.[selectedDateKey];
                      const isDone = habitStatus === 'done';
                      const canMarkDone = !isDone && isToday(selectedDate);
                      
                      return (
                        <div key={habit._id} className="habit-item">
                          <div className="habit-color" style={{ backgroundColor: habit.color || "#da746f" }} />
                          <div className="habit-info">
                            <span className="habit-name">{habit.habitName}</span>
                            <span className="habit-category">{habit.category}</span>
                          </div>
                          <div className="habit-status">
                            {isDone ? (
                              <span className="status-done">✅ Done</span>
                            ) : canMarkDone ? (
                              <button 
                                className="mark-done-btn"
                                onClick={() => markHabitAsDone(habit._id, selectedDate)}
                              >
                                Mark Done
                              </button>
                            ) : (
                              <span className="status-pending">
                                {isToday(selectedDate) ? "Mark Done" : "Not Done"}
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default Calendar;