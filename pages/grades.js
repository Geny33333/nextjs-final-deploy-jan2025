import { useState } from 'react';
import Link from 'next/link';

export default function Grades() {
  const [grades, setGrades] = useState([
    { id: 1, subject: 'Mathematics', grade: 'A', credits: 4, semester: 'Fall 2024' },
    { id: 2, subject: 'Physics', grade: 'A-', credits: 4, semester: 'Fall 2024' },
    { id: 3, subject: 'English', grade: 'B+', credits: 3, semester: 'Fall 2024' },
    { id: 4, subject: 'History', grade: 'A', credits: 3, semester: 'Fall 2024' },
  ]);
  const [newGrade, setNewGrade] = useState({ subject: '', grade: '', credits: '', semester: 'Spring 2025' });

  const addGrade = () => {
    if (newGrade.subject && newGrade.grade && newGrade.credits) {
      const grade = {
        id: grades.length + 1,
        ...newGrade,
        credits: parseFloat(newGrade.credits)
      };
      setGrades([...grades, grade]);
      setNewGrade({ subject: '', grade: '', credits: '', semester: 'Spring 2025' });
    }
  };

  const deleteGrade = (id) => {
    setGrades(grades.filter(grade => grade.id !== id));
  };

  const gradeToPoint = (grade) => {
    const gradeMap = {
      'A+': 4.0, 'A': 4.0, 'A-': 3.7,
      'B+': 3.3, 'B': 3.0, 'B-': 2.7,
      'C+': 2.3, 'C': 2.0, 'C-': 1.7,
      'D+': 1.3, 'D': 1.0, 'F': 0.0
    };
    return gradeMap[grade] || 0;
  };

  const calculateGPA = () => {
    const totalPoints = grades.reduce((sum, g) => sum + (gradeToPoint(g.grade) * g.credits), 0);
    const totalCredits = grades.reduce((sum, g) => sum + g.credits, 0);
    return totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : '0.00';
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', padding: '40px 20px' }}>
      <Link href="/">
        <a style={{ color: 'white', textDecoration: 'none', fontSize: '14px', marginBottom: '20px', display: 'inline-block' }}>← Back to Dashboard</a>
      </Link>
      
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', flexWrap: 'wrap', gap: '20px' }}>
          <h1 style={{ color: 'white', fontSize: '32px', fontWeight: 'bold' }}>🎓 Grades</h1>
          <div style={{ background: 'rgba(255,255,255,0.2)', padding: '16px 24px', borderRadius: '12px', backdropFilter: 'blur(10px)' }}>
            <p style={{ color: 'white', fontSize: '14px', marginBottom: '4px' }}>Current GPA</p>
            <p style={{ color: 'white', fontSize: '36px', fontWeight: 'bold' }}>{calculateGPA()}</p>
          </div>
        </div>
        
        {/* Add Grade Form */}
        <div style={{ background: 'white', borderRadius: '12px', padding: '24px', marginBottom: '30px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px' }}>Add New Grade</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', marginBottom: '16px' }}>
            <input
              type="text"
              placeholder="Subject"
              value={newGrade.subject}
              onChange={(e) => setNewGrade({...newGrade, subject: e.target.value})}
              style={{ padding: '12px', border: '2px solid #e0e0e0', borderRadius: '8px', fontSize: '16px' }}
            />
            <select
              value={newGrade.grade}
              onChange={(e) => setNewGrade({...newGrade, grade: e.target.value})}
              style={{ padding: '12px', border: '2px solid #e0e0e0', borderRadius: '8px', fontSize: '16px' }}
            >
              <option value="">Select Grade</option>
              <option>A+</option>
              <option>A</option>
              <option>A-</option>
              <option>B+</option>
              <option>B</option>
              <option>B-</option>
              <option>C+</option>
              <option>C</option>
              <option>C-</option>
              <option>D+</option>
              <option>D</option>
              <option>F</option>
            </select>
            <input
              type="number"
              placeholder="Credits"
              value={newGrade.credits}
              onChange={(e) => setNewGrade({...newGrade, credits: e.target.value})}
              style={{ padding: '12px', border: '2px solid #e0e0e0', borderRadius: '8px', fontSize: '16px' }}
            />
            <input
              type="text"
              placeholder="Semester"
              value={newGrade.semester}
              onChange={(e) => setNewGrade({...newGrade, semester: e.target.value})}
              style={{ padding: '12px', border: '2px solid #e0e0e0', borderRadius: '8px', fontSize: '16px' }}
            />
          </div>
          <button
            onClick={addGrade}
            style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', color: 'white', padding: '14px 28px', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: '600', cursor: 'pointer', width: '100%' }}
          >
            Add Grade
          </button>
        </div>

        {/* Grades Table */}
        <div style={{ background: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #e0e0e0' }}>
                <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600', color: '#333' }}>Subject</th>
                <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600', color: '#333' }}>Grade</th>
                <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600', color: '#333' }}>Credits</th>
                <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600', color: '#333' }}>Semester</th>
                <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600', color: '#333' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {grades.map(grade => (
                <tr key={grade.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                  <td style={{ padding: '16px', color: '#333' }}>{grade.subject}</td>
                  <td style={{ padding: '16px' }}>
                    <span style={{
                      background: gradeToPoint(grade.grade) >= 3.7 ? '#4caf50' : gradeToPoint(grade.grade) >= 3.0 ? '#2196f3' : '#ff9800',
                      color: 'white',
                      padding: '4px 12px',
                      borderRadius: '12px',
                      fontWeight: '600',
                      fontSize: '14px'
                    }}>
                      {grade.grade}
                    </span>
                  </td>
                  <td style={{ padding: '16px', color: '#666' }}>{grade.credits}</td>
                  <td style={{ padding: '16px', color: '#666' }}>{grade.semester}</td>
                  <td style={{ padding: '16px' }}>
                    <button
                      onClick={() => deleteGrade(grade.id)}
                      style={{ background: '#ff4444', color: 'white', border: 'none', borderRadius: '6px', padding: '8px 16px', cursor: 'pointer', fontSize: '14px' }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
