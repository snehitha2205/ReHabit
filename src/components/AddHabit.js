// import React, { useState } from "react";
// import "./AddHabit.css";

// function AddHabit({ onAddHabit, onClose }) {
//   const [habitName, setHabitName] = useState("");
//   const [description, setDescription] = useState("");
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [frequency, setFrequency] = useState("daily");
//   const [error, setError] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");
//   const [category, setCategory] = useState("General");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccessMessage("");

//     if (!habitName.trim()) {
//       setError("Habit Name is required");
//       return;
//     }
//     if (startDate && isNaN(Date.parse(startDate))) {
//       setError("Start Date is invalid");
//       return;
//     }

//     const newHabit = {
//       habitName,
//       description,
//       startDate,
//       endDate,
//       frequency,
//       category,
//     };

//     setTimeout(() => {
//       onAddHabit(newHabit);
//       setSuccessMessage("Habit added successfully!");
//       setHabitName("");
//       setDescription("");
//       setStartDate("");
//       setEndDate("");
//       setFrequency("daily");
//       setCategory("General");
//     }, 500);
//   };

//   return (
//     <div className="addHabitForm">
//       <button 
//         className="closeButton" 
//         onClick={onClose} 
//         title="Close"
//         type="button"
//         aria-label="Close dialog"
//       >
//         &times;
//       </button>
//       <h2 className="title">Add New Habit</h2>
//       <form onSubmit={handleSubmit} className="form" noValidate>
//         {error && (
//           <p className="error" role="alert" aria-live="polite">
//             {error}
//           </p>
//         )}
//         {successMessage && (
//           <p className="success" role="status" aria-live="polite">
//             {successMessage}
//           </p>
//         )}

//         <div className="formGroup">
//           <label htmlFor="habitName" className="label">
//             Habit Name*
//           </label>
//           <input
//             id="habitName"
//             type="text"
//             value={habitName}
//             onChange={(e) => setHabitName(e.target.value)}
//             placeholder="Enter habit name"
//             className="input"
//             required
//             aria-required="true"
//             aria-invalid={error && error.includes("Habit Name")}
//           />
//         </div>

//         <div className="formGroup">
//           <label htmlFor="description" className="label">
//             Description
//           </label>
//           <textarea
//             id="description"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             placeholder="Short description"
//             className="textarea"
//             rows="3"
//           />
//         </div>

//         <div className="formGroup">
//           <label htmlFor="startDate" className="label">
//             Start Date
//           </label>
//           <input
//             id="startDate"
//             type="date"
//             value={startDate}
//             onChange={(e) => setStartDate(e.target.value)}
//             className="input"
//             aria-invalid={error && error.includes("Start Date")}
//           />
//         </div>

//          <div className="formGroup">
//           <label htmlFor="endDate" className="label">
//             End Date
//           </label>
//           <input
//             id="endDate"
//             type="date"
//             value={endDate}
//             onChange={(e) => setEndDate(e.target.value)}
//             className="input"
//             aria-invalid={error && error.includes("End Date")}
//           />
//         </div>

//         <div className="formGroup">
//           <label htmlFor="frequency" className="label">
//             Frequency
//           </label>
//           <select
//             id="frequency"
//             value={frequency}
//             onChange={(e) => setFrequency(e.target.value)}
//             className="input"
//           >
//             <option value="daily">Daily</option>
//             <option value="weekly">Weekly</option>
//             <option value="monthly">Monthly</option>
//           </select>
//         </div>

//         <div className="formGroup">
//           <label htmlFor="category" className="label">
//             Category
//           </label>
//           <select
//             id="category"
//             value={category}
//             onChange={(e) => setCategory(e.target.value)}
//             className="input"
//           >
//             <option value="general">General</option>
//             <option value="health">Health</option>
//             <option value="study">Study</option>
//             <option value="work">Work</option>
//             <option value="personal">Personal</option>
//           </select>
//         </div>

//         <button type="submit" className="button">
//           Add Habit
//         </button>
//       </form>
//     </div>
//   );
// }

// export default AddHabit;


import React, { useState } from "react";
import "./AddHabit.css";

function AddHabit({ onAddHabit, onClose, edit }) {
  const [habitName, setHabitName] = useState(edit?.habitName || "");
  const [description, setDescription] = useState(edit?.description || "");
  const [startDate, setStartDate] = useState(edit?.startDate || "");
  const [endDate, setEndDate] = useState(edit?.endDate || "");
  const [frequency, setFrequency] = useState(edit?.frequency || "daily");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [category, setCategory] = useState(edit?.category || "General");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (!habitName.trim()) {
      setError("Habit Name is required");
      return;
    }
    if (startDate && isNaN(Date.parse(startDate))) {
      setError("Start Date is invalid");
      return;
    }
    if (endDate && startDate && new Date(endDate) < new Date(startDate)) {
      setError("End Date cannot be before Start Date");
      return;
    }

    const newHabit = {
      habitName,
      description,
      startDate,
      endDate,
      frequency,
      category,
    };

    setTimeout(() => {
      onAddHabit(newHabit);
      setSuccessMessage(edit ? "Habit updated successfully!" : "Habit added successfully!");
      
      if (!edit) {
        setHabitName("");
        setDescription("");
        setStartDate("");
        setEndDate("");
        setFrequency("daily");
        setCategory("General");
      }
    }, 500);
  };

  const habitTips = [
    "Start small and be consistent",
    "Track your progress daily",
    "Set realistic goals",
    "Celebrate small wins",
    "Pair habits with existing routines"
  ];

  return (
    <div className="add-habit-modal">
      <div className="addHabitFormHybrid">
        <div className="addHabitLeft">
          <div className="leftContent">
            <div className="headerSection">
              <div className="habitIcon">
                <svg width="80" height="80" fill="none" viewBox="0 0 80 80">
                  <rect x="16" y="18" width="48" height="44" rx="8" fill="#fff6f5" stroke="#d6304c" strokeWidth="2"/>
                  <rect x="22" y="24" width="36" height="32" rx="6" fill="#fffafe" stroke="#da746f" strokeWidth="1.5"/>
                  <path d="M40 42 l5 7-8-2-8 2 5-7-5-7 8 2 8-2-5 7z" fill="#fffafe" stroke="#d6304c" strokeWidth="1.5"/>
                  <rect x="28" y="14" width="5" height="10" rx="2.5" fill="#da746f"/>
                  <rect x="47" y="14" width="5" height="10" rx="2.5" fill="#da746f"/>
                </svg>
              </div>
              <h2 className="title">{edit ? "Edit Habit" : "Add New Habit"}</h2>
            </div>

            <div className="mainContent">
              <div className="habitTips">
                <h3 className="tipsTitle">
                  <span className="tipsIcon">💡</span>
                  Habit Tips
                </h3>
                <ul className="tipsList">
                  {habitTips.map((tip, index) => (
                    <li key={index} className="tipItem">
                      <span className="tipBullet"></span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="motivationQuote">
                <div className="quoteIcon">✨</div>
                <p className="quoteText">"Small daily improvements lead to stunning results"</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="addHabitRight">
          <button className="closeButton" onClick={onClose} title="Close" type="button" aria-label="Close dialog">
            &times;
          </button>
          
          <form onSubmit={handleSubmit} className="formHybrid" noValidate>
            {error && (
              <p className="error" role="alert" aria-live="polite">{error}</p>
            )}
            {successMessage && (
              <p className="success" role="status" aria-live="polite">{successMessage}</p>
            )}

            <div className="formSection">
              <div className="formGroup">
                <label htmlFor="habitName" className="label">
                  <span className="required">Habit Name*</span>
                </label>
                <input
                  id="habitName"
                  type="text"
                  value={habitName}
                  onChange={(e) => setHabitName(e.target.value)}
                  placeholder="Enter habit name"
                  className="input"
                  required
                  aria-required="true"
                  aria-invalid={error && error.includes("Habit Name")}
                />
              </div>

              <div className="formGroup">
                <label htmlFor="description" className="label">Description</label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Short description about your habit"
                  className="textarea"
                  rows="3"
                />
              </div>
            </div>

            <div className="formSection">
              <div className="rowDateGroup">
                <div className="formGroup dateGroup">
                  <label htmlFor="startDate" className="label">Start Date</label>
                  <input
                    id="startDate"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="input"
                    aria-invalid={error && error.includes("Start Date")}
                  />
                </div>
                <div className="formGroup dateGroup">
                  <label htmlFor="endDate" className="label">End Date</label>
                  <input
                    id="endDate"
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="input"
                    aria-invalid={error && error.includes("End Date")}
                  />
                </div>
              </div>
            </div>

            <div className="formSection">
              <div className="formGroup">
                <label htmlFor="frequency" className="label">Frequency</label>
                <select
                  id="frequency"
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value)}
                  className="input"
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>

              <div className="formGroup">
                <label htmlFor="category" className="label">Category</label>
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="input"
                >
                  <option value="General">General</option>
                  <option value="Health">Health</option>
                  <option value="Study">Study</option>
                  <option value="Work">Work</option>
                  <option value="Personal">Personal</option>
                </select>
              </div>
            </div>

            <button type="submit" className="button primaryButton">
              {edit ? "Update Habit" : "Add Habit"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddHabit;