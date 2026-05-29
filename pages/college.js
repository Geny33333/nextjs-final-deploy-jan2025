import { useState } from 'react';

export default function College() {
  const [colleges, setColleges] = useState([]);
  const [newCollege, setNewCollege] = useState({ name: '', deadline: '', status: 'Not Started', type: 'Safety' });
  const [showForm, setShowForm] = useState(false);

  const addCollege = () => {
    if (newCollege.name && newCollege.deadline) {
      setColleges([...colleges, { ...newCollege, id: Date.now() }]);
      setNewCollege({ name: '', deadline: '', status: 'Not Started', type: 'Safety' });
      setShowForm(false);
    }
  };

  const deleteCollege = (id) => {
    setColleges(colleges.filter(c => c.id !== id));
  };

  const updateStatus = (id, newStatus) => {
    setColleges(colleges.map(c => c.id === id ? { ...c, status: newStatus } : c));
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Accepted': return '#10b981';
      case 'Submitted': return '#3b82f6';
      case 'In Progress': return '#f59e0b';
      case 'Rejected': return '#ef4444';
      default: return '#6b7280';
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '20px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '36px', fontWeight: 'bold', color: 'white', marginBottom: '30px', textAlign: 'center' }}>College Planning</h1>
        
        <button
          onClick={() => setShowForm(!showForm)}
          style={{ background: 'white', color: '#667eea', border: 'none', borderRadius: '8px', padding: '12px 24px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', marginBottom: '20px' }}
        >
          {showForm ? 'Cancel' : '+ Add College'}
        </button>

        {showForm && (
          <div style={{ background: 'white', borderRadius: '12px', padding: '24px', marginBottom: '20px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
            <h2 style={{ fontSize: '20px', marginBottom: '16px', color: '#667eea' }}>Add New College</h2>
            <div style={{ display: 'grid', gap: '12px' }}>
              <input
                type="text"
                placeholder="College Name"
                value={newCollege.name}
                onChange={(e) => setNewCollege({...newCollege, name: e.target.value})}
                style={{ padding: '10px', border: '2px solid #e5e7eb', borderRadius: '6px', fontSize: '14px' }}
              />
              <input
                type="date"
                value={newCollege.deadline}
                onChange={(e) => setNewCollege({...newCollege, deadline: e.target.value})}
                style={{ padding: '10px', border: '2px solid #e5e7eb', borderRadius: '6px', fontSize: '14px' }}
              />
              <select
                value={newCollege.type}
                onChange={(e) => setNewCollege({...newCollege, type: e.target.value})}
                style={{ padding: '10px', border: '2px solid #e5e7eb', borderRadius: '6px', fontSize: '14px' }}
              >
                <option value="Safety">Safety</option>
                <option value="Target">Target</option>
                <option value="Reach">Reach</option>
              </select>
              <button
                onClick={addCollege}
                style={{ background: '#667eea', color: 'white', border: 'none', borderRadius: '6px', padding: '12px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}
              >
                Add College
              </button>
            </div>
          </div>
        )}

        <div style={{ display: 'grid', gap: '16px' }}>
          {['Safety', 'Target', 'Reach'].map(type => {
            const typeColleges = colleges.filter(c => c.type === type);
            if (typeColleges.length === 0) return null;
            
            return (
              <div key={type} style={{ background: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#667eea', marginBottom: '16px' }}>{type} Schools ({typeColleges.length})</h3>
                <div style={{ display: 'grid', gap: '12px' }}>
                  {typeColleges.map(college => (
                    <div key={college.id} style={{ background: '#f9fafb', borderRadius: '8px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '4px' }}>{college.name}</h4>
                        <p style={{ fontSize: '14px', color: '#6b7280' }}>Deadline: {college.deadline}</p>
                      </div>
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <select
                          value={college.status}
                          onChange={(e) => updateStatus(college.id, e.target.value)}
                          style={{ padding: '6px 10px', borderRadius: '6px', border: '2px solid #e5e7eb', background: getStatusColor(college.status), color: 'white', fontSize: '14px', fontWeight: '500' }}
                        >
                          <option value="Not Started">Not Started</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Submitted">Submitted</option>
                          <option value="Accepted">Accepted</option>
                          <option value="Rejected">Rejected</option>
                        </select>
                        <button
                          onClick={() => deleteCollege(college.id)}
                          style={{ background: '#ef4444', color: 'white', border: 'none', borderRadius: '6px', padding: '8px 12px', fontSize: '14px', cursor: 'pointer' }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {colleges.length === 0 && (
          <div style={{ background: 'white', borderRadius: '12px', padding: '40px', textAlign: 'center', color: '#6b7280' }}>
            <p style={{ fontSize: '18px' }}>No colleges added yet. Click "Add College" to start planning!</p>
          </div>
        )}
      </div>
    </div>
  );
}
