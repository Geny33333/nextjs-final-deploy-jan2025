import { useState } from 'react';
import Link from 'next/link';

export default function Notes() {
  const [notes, setNotes] = useState([
    { id: 1, title: 'Study Materials', content: 'Key concepts for upcoming exam', date: '2025-01-20', category: 'School' },
    { id: 2, title: 'Photography Ideas', content: 'Golden hour shots at the park', date: '2025-01-18', category: 'Photography' },
  ]);
  const [newNote, setNewNote] = useState({ title: '', content: '', category: 'School' });
  const [filter, setFilter] = useState('All');

  const addNote = () => {
    if (newNote.title && newNote.content) {
      const note = {
        id: notes.length + 1,
        ...newNote,
        date: new Date().toISOString().split('T')[0]
      };
      setNotes([note, ...notes]);
      setNewNote({ title: '', content: '', category: 'School' });
    }
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const filteredNotes = filter === 'All' ? notes : notes.filter(note => note.category === filter);

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '40px 20px' }}>
      <Link href="/">
        <a style={{ color: 'white', textDecoration: 'none', fontSize: '14px', marginBottom: '20px', display: 'inline-block' }}>← Back to Dashboard</a>
      </Link>
      
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ color: 'white', fontSize: '32px', fontWeight: 'bold', marginBottom: '30px' }}>📝 Notes</h1>
        
        {/* Add Note Form */}
        <div style={{ background: 'white', borderRadius: '12px', padding: '24px', marginBottom: '30px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px' }}>Create New Note</h2>
          <input
            type="text"
            placeholder="Note Title"
            value={newNote.title}
            onChange={(e) => setNewNote({...newNote, title: e.target.value})}
            style={{ width: '100%', padding: '12px', border: '2px solid #e0e0e0', borderRadius: '8px', marginBottom: '12px', fontSize: '16px' }}
          />
          <textarea
            placeholder="Note Content"
            value={newNote.content}
            onChange={(e) => setNewNote({...newNote, content: e.target.value})}
            style={{ width: '100%', padding: '12px', border: '2px solid #e0e0e0', borderRadius: '8px', marginBottom: '12px', fontSize: '16px', minHeight: '120px' }}
          />
          <select
            value={newNote.category}
            onChange={(e) => setNewNote({...newNote, category: e.target.value})}
            style={{ width: '100%', padding: '12px', border: '2px solid #e0e0e0', borderRadius: '8px', marginBottom: '16px', fontSize: '16px' }}
          >
            <option>School</option>
            <option>Photography</option>
            <option>College</option>
            <option>Personal</option>
          </select>
          <button
            onClick={addNote}
            style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', padding: '14px 28px', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: '600', cursor: 'pointer', width: '100%' }}
          >
            Add Note
          </button>
        </div>

        {/* Filter */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
          {['All', 'School', 'Photography', 'College', 'Personal'].map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              style={{
                padding: '8px 20px',
                border: 'none',
                borderRadius: '20px',
                background: filter === cat ? 'white' : 'rgba(255,255,255,0.3)',
                color: filter === cat ? '#667eea' : 'white',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '14px'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Notes Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
          {filteredNotes.map(note => (
            <div key={note.id} style={{ background: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', position: 'relative' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
                <span style={{ background: '#f0f0f0', padding: '4px 12px', borderRadius: '12px', fontSize: '12px', fontWeight: '600', color: '#666' }}>
                  {note.category}
                </span>
                <button
                  onClick={() => deleteNote(note.id)}
                  style={{ background: '#ff4444', color: 'white', border: 'none', borderRadius: '6px', padding: '6px 12px', cursor: 'pointer', fontSize: '12px' }}
                >
                  Delete
                </button>
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px', color: '#333' }}>{note.title}</h3>
              <p style={{ color: '#666', fontSize: '14px', lineHeight: '1.5', marginBottom: '12px' }}>{note.content}</p>
              <p style={{ fontSize: '12px', color: '#999' }}>{note.date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
