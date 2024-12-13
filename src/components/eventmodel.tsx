import React, { useState } from 'react';
import './model.css';

interface Event {
  id: number;
  name: string;
  startTime: string;
  endTime: string;
  description?: string;
}

interface EventModalProps {
  date: Date;
  events: Event[];
  onAddEvent: (event: Event) => void;
  onClose: () => void;
}

const EventModal: React.FC<EventModalProps> = ({ date, events, onAddEvent, onClose }) => {
  const [eventName, setEventName] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [description, setDescription] = useState('');

  const handleAddEvent = () => {
    const newEvent: Event = {
      id: Date.now(),
      name: eventName,
      startTime,
      endTime,
      description,
    };
    onAddEvent(newEvent);
    setEventName('');
    setStartTime('');
    setEndTime('');
    setDescription('');
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Events for {date.toDateString()}</h2>
        <div className="event-list">
          {events.map((event) => (
            <div key={event.id} className="event-item">
              <h4>{event.name}</h4>
              <p>
                {event.startTime} - {event.endTime}
              </p>
              <p>{event.description}</p>
            </div>
          ))}
        </div>
        <div className="add-event">
          <input
            type="text"
            placeholder="Event Name"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
          />
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button onClick={handleAddEvent}>Add Event</button>
        </div>
        <button className="close-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default EventModal;
