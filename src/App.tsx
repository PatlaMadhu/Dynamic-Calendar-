import React, { useState } from 'react';
import Calendar from './components/calendar';
import EventModal from './components/eventmodel';
import './index.css';

interface Event {
  id: number;
  name: string;
  startTime: string;
  endTime: string;
  description?: string;
}

const App: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [events, setEvents] = useState<{ [key: string]: Event[] }>({});
  const [showModal, setShowModal] = useState(false);

  const handleDayClick = (date: Date) => {
    setSelectedDate(date);
    setShowModal(true);
  };

  const handleAddEvent = (newEvent: Event) => {
    if (selectedDate) {
      const dateKey = selectedDate.toISOString().split('T')[0];
      setEvents((prevEvents) => ({
        ...prevEvents,
        [dateKey]: [...(prevEvents[dateKey] || []), newEvent],
      }));
    }
  };

  const getEventsForDate = (date: Date) => {
    const dateKey = date.toISOString().split('T')[0];
    return events[dateKey] || [];
  };

  return (
    <div className="app">
      <h1>Dynamic Event Calendar</h1>
      <Calendar onDayClick={handleDayClick} />
      {showModal && selectedDate && (
        <EventModal
          date={selectedDate}
          events={getEventsForDate(selectedDate)}
          onAddEvent={handleAddEvent}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default App;
