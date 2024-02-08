import React, { useState } from "react";
import "./Calendarr.css";
import FAQ from "./FAQ";

const Calendarr = () => {
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const getMonthDays = (year, month) => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];

    for (
      let date = new Date(firstDay);
      date <= lastDay;
      date.setDate(date.getDate() + 1)
    ) {
      if (date.getMonth() === month) {
        days.push(new Date(date));
      }
    }

    return days;
  };

  const isToday = (date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const handlePrevMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() - 1);
    setCurrentDate(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + 1);
    setCurrentDate(newDate);
  };

  const monthDays = getMonthDays(
    currentDate.getFullYear(),
    currentDate.getMonth()
  );

  return (
    <div className="calendar-faq-container">
      <div className="left-panel">
        {/* FAQ component */}
        <FAQ />
      </div>
      <div className="calendar-container">
        <div className="calendar-header">
          <button onClick={handlePrevMonth}>&lt;</button>
          <h2>
            {new Intl.DateTimeFormat("en-US", {
              month: "long",
              year: "numeric",
            }).format(currentDate)}
          </h2>
          <button onClick={handleNextMonth}>&gt;</button>
        </div>
        <div className="calendar-days">
          {weekdays.map((weekday) => (
            <div key={weekday} className="calendar-day">
              {weekday}
            </div>
          ))}
          {monthDays.map((day) => (
            <div
              key={day}
              className={`calendar-day ${
                selectedDate &&
                selectedDate.toDateString() === day.toDateString()
                  ? "selected"
                  : ""
              } ${isToday(day) ? "today" : ""}`}
              onClick={() => setSelectedDate(day)}
            >
              {day.getDate()}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calendarr;
