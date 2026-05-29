import Link from 'next/link';
import { useState } from 'react';

export default function Calendar() {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({ title: '', date: '', time: '' });

  const addEvent = () => {
    if (newEvent.title && newEvent.date) {
      setEvents([...events, { ...newEvent, id: Date.now() }]);
      setNewEvent({ title: '', date: '', time: '' });
    }
  };

  const deleteEvent = (id) => {
    setEvents(events.filter(e => e.id !== id));
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '20px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <Link href="/" style={{ color: 'white', textDecoration: 'none', fontSize: '16px' }}>← Back to Dashboard</Link>
        
        <h1 style={{ color: 'white', fontSize: '36px', marginTop: '20px', marginBottom: '30px' }}>📅 Calendar & Timetable</h1>
        
        <div style={{ background: 'white', borderRadius: '15px', padding: '25px', marginBottom: '20px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
          <h2 style={{ fontSize: '24px', marginBottom: '20px', color: '#333' }}>Add New Event</h2>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '15px' }}>
            <input 
              type="text" 
              placeholder="Event title" 
              value={newEvent.title}
              onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
              style={{ flex: '1', minWidth: '200px', padding: '12px', border: '2px solid #e0e0e0', borderRadius: '8px', fontSize: '14px' }}
            />
            <input 
              type="date" 
              value={newEvent.date}
              onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
              style={{ padding: '12px', border: '2px solid #e0e0e0', borderRadius: '8px', fontSize: '14px' }}
            />
            <input 
              type="time" 
              value={newEvent.time}
              onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
              style={{ padding: '12px', border: '2px solid #e0e0e0', borderRadius: '8px', fontSize: '14px' }}
            />
          </div>
          <button 
            onClick={addEvent}
            style={{ background: '#667eea', color: 'white', padding: '12px 30px', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold' }}
          >
            Add Event
          </button>
        </div>

        <div style={{ background: 'white', borderRadius: '15px', padding: '25px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
          <h2 style={{ fontSize: '24px', marginBottom: '20px', color: '#333' }}>Upcoming Events</h2>
          {events.length === 0 ? (
            <p style={{ color: '#999', textAlign: 'center', padding: '20px' }}>No events scheduled. Add your first event above!</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {events.map(event => (
                <div key={event.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px', background: '#f8f9ff', borderRadius: '8px', border: '1px solid #e0e0ff' }}>
                  <div>
                    <div style={{ fontWeight: 'bold', fontSize: '16px', color: '#333' }}>{event.title}</div>
                    <div style={{ fontSize: '14px', color: '#666', marginTop: '5px' }}>
                      📅 {event.date} {event.time && `⏰ ${event.time}`}
                    </div>
                  </div>
                  <button 
                    onClick={() => deleteEvent(event.id)}
                    style={{ background: '#ff6b6b', color: 'white', padding: '8px 16px', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '14px' }}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
