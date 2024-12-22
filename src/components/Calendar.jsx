import { useState, useEffect, useCallback } from "react";

const daysInMonth = (month, year) => new Date(year, month, 0).getDate();

const festivals = {
  "2025-1-1": "New Year's Day",
  "2025-1-13": "Lohri",
  "2025-1-14": "Makar Sankranti / Pongal",
  "2025-1-26": "Republic Day (India)",
  "2025-2-14": "Valentine's Day",
  "2025-3-1": "Maha Shivaratri",
  "2025-3-17": "Holi",
  "2025-3-20": "Spring Equinox",
  "2025-4-10": "Good Friday",
  "2025-4-13": "Easter Sunday",
  "2025-4-14": "Baisakhi / Ambedkar Jayanti",
  "2025-5-1": "International Workers' Day",
  "2025-5-14": "Eid al-Fitr",
  "2025-6-21": "International Yoga Day",
  "2025-7-29": "Muharram / Islamic New Year",
  "2025-8-15": "Independence Day (India)",
  "2025-8-19": "Raksha Bandhan",
  "2025-8-30": "Janmashtami",
  "2025-9-7": "Ganesh Chaturthi",
  "2025-9-23": "Autumn Equinox",
  "2025-10-2": "Gandhi Jayanti",
  "2025-10-20": "Dussehra",
  "2025-10-31": "Halloween",
  "2025-11-1": "Karva Chauth",
  "2025-11-9": "Diwali",
  "2025-11-10": "Govardhan Puja",
  "2025-11-11": "Bhai Dooj",
  "2025-12-25": "Christmas"
};

export default function Calendar({ username }) {
  const [tasks, setTasks] = useState({});
  const [notes, setNotes] = useState({});
  const [currentMonth, setCurrentMonth] = useState(0); // Index of the current month (0 = January)
  const [monthlyProgress, setMonthlyProgress] = useState({});

  const calculateProgress = useCallback((savedTasks) => {
    let progress = {};

    for (let month = 0; month < 12; month++) {
      let completed = 0;
      let total = 0;
      const days = daysInMonth(month + 1, 2025);

      for (let day = 1; day <= days; day++) {
        const date = `2025-${month + 1}-${day}`;
        if (savedTasks[date]) {
          total++;
          if (savedTasks[date] === "green") completed++;
        }
      }

      if (total > 0) {
        progress[`${2025}-${month}`] = Math.round((completed / total) * 100);
      }
    }

    setMonthlyProgress(progress);
  }, []);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem(`${username}-tasks`)) || {};
    const savedNotes = JSON.parse(localStorage.getItem(`${username}-notes`)) || {};
    setTasks(savedTasks);
    setNotes(savedNotes);
    calculateProgress(savedTasks);
  }, [username, calculateProgress]);

  const handleTaskClick = (date, color) => {
    const newTasks = { ...tasks, [date]: color };
    setTasks(newTasks);
    localStorage.setItem(`${username}-tasks`, JSON.stringify(newTasks));
    calculateProgress(newTasks);
  };

  const handleNoteChange = (date, note) => {
    const newNotes = { ...notes, [date]: note };
    setNotes(newNotes);
    localStorage.setItem(`${username}-notes`, JSON.stringify(newNotes));
  };

  const days = daysInMonth(currentMonth + 1, 2025);
  const progress = monthlyProgress[`2025-${currentMonth}`] || 0;

  const goToPreviousMonth = () => {
    if (currentMonth > 0) setCurrentMonth((prev) => prev - 1);
  };

  const goToNextMonth = () => {
    if (currentMonth < 11) setCurrentMonth((prev) => prev + 1);
  };

  return (
    <div
      className="p-6 min-h-screen text-black"
      style={{
        backgroundImage: `url(/bgw.png)`, // Reference to the bgw.png image in the public folder
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h1 className="text-4xl font-bold text-center mb-6 drop-shadow-lg">
        Hello, {username}! Your 2025 Task Calendar
      </h1>
      <p className="text-lg font-medium text-center mb-8 italic">
        "Plan your days with purpose and make every moment count."
      </p>

      <div className="flex justify-between items-center mb-6">
        <button
          onClick={goToPreviousMonth}
          disabled={currentMonth === 0}
          className="bg-indigo-600 px-4 py-2 rounded shadow hover:bg-indigo-700 disabled:opacity-50"
        >
          Previous
        </button>
        <h2 className="text-2xl font-bold text-center text-black">
          {new Date(2025, currentMonth).toLocaleString("default", {
            month: "long",
          })}{" "}
          2025
        </h2>
        <button
          onClick={goToNextMonth}
          disabled={currentMonth === 11}
          className="bg-indigo-600 px-4 py-2 rounded shadow hover:bg-indigo-700 disabled:opacity-50"
        >
          Next
        </button>
      </div>

      <div className=" text-gray-800 p-6 rounded-lg shadow-2xl border-2 border-indigo-600">
        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: days }).map((_, day) => {
            const date = `2025-${currentMonth + 1}-${day + 1}`;
            const occasion = festivals[date];

            return (
              <div
                key={date}
                className="border border-gray-300 rounded-lg p-2 flex flex-col items-center bg-gradient-to-br from-gray-50 to-gray-100"
              >
                <div className="text-sm font-semibold text-gray-800">
                  {day + 1}
                </div>
                {occasion && (
                  <div className="text-xs text-blue-600 italic mt-1">
                    {occasion}
                  </div>
                )}
                <button
                  className={`w-8 h-8 rounded-full mt-2 ${
                    tasks[date] === "green"
                      ? "bg-green-500"
                      : tasks[date] === "red"
                      ? "bg-red-500"
                      : "bg-gray-300 hover:bg-blue-400 transition"
                  }`}
                  onClick={() => handleTaskClick(date, "green")}
                  disabled={tasks[date]}
                >
                  ✔
                </button>
                <button
                  className={`w-8 h-8 rounded-full mt-1 ${
                    tasks[date] === "red"
                      ? "bg-red-500"
                      : tasks[date] === "green"
                      ? "bg-green-500"
                      : "bg-gray-300 hover:bg-red-400 transition"
                  }`}
                  onClick={() => handleTaskClick(date, "red")}
                  disabled={tasks[date]}
                >
                  ✘
                </button>
                <textarea
                  className="mt-2 w-full p-2 rounded text-sm bg-gray-200 focus:ring-2 focus:ring-indigo-400"
                  placeholder="Add note..."
                  value={notes[date] || ""}
                  onChange={(e) => handleNoteChange(date, e.target.value)}
                ></textarea>
              </div>
            );
          })}
        </div>
        <div className="mt-4 text-center">
          <span className="text-sm text-gray-700 font-medium">
            Progress: <span className="text-indigo-700">{progress}%</span>{" "}
            completed
          </span>
        </div>
      </div>
    </div>
  );
}
