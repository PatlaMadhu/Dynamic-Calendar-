import React, { useState } from 'react';
import './calendar.css';

interface CalendarProps {
  onDayClick: (date: Date) => void;
}

const Calendar: React.FC<CalendarProps> = ({ onDayClick }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDayOfWeek = new Date(year, month, 1).getDay();
    const totalDays = daysInMonth(year, month);

    const days: JSX.Element[] = [];
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(<div className="empty-day" key={`empty-${i}`} />);
    }
    for (let day = 1; day <= totalDays; day++) {
      const date = new Date(year, month, day);
      const isToday =
        date.toDateString() === new Date().toDateString() ? 'today' : '';

      days.push(
        <div
          className={`day ${isToday}`}
          key={day}
          onClick={() => onDayClick(date)}
        >
          {day}
        </div>
      );
    }
    return days;
  };

  const changeMonth = (offset: number) => {
    const newDate = new Date(
      currentDate.setMonth(currentDate.getMonth() + offset)
    );
    setCurrentDate(newDate);
  };

  return (
    <div className="calendar">
      <div className="calendar-header">
        <button onClick={() => changeMonth(-1)}>Previous</button>
        <h3>
          {currentDate.toLocaleString('default', { month: 'long' })}{' '}
          {currentDate.getFullYear()}
        </h3>
        <button onClick={() => changeMonth(1)}>Next</button>
      </div>
      <div className="calendar-grid">{generateCalendarDays()}</div>
    </div>
  );
};

export default Calendar;
