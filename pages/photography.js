import { useState } from 'react';
import Link from 'next/link';

export default function Photography() {
  const [projects, setProjects] = useState([
    { id: 1, title: 'Golden Hour Landscapes', description: 'Sunset shots at local park', date: '2025-01-15', status: 'Completed', images: 25 },
    { id: 2, title: 'Portrait Series', description: 'Studio portrait project', date: '2025-01-10', status: 'In Progress', images: 12 },
  ]);
  const [newProject, setNewProject] = useState({ title: '', description: '', status: 'Planning', images: 0 });

  const addProject = () => {
    if (newProject.title && newProject.description) {
      const project = {
        id: projects.length + 1,
        ...newProject,
        date: new Date().toISOString().split('T')[0],
        images: parseInt(newProject.images) || 0
      };
      setProjects([project, ...projects]);
      setNewProject({ title: '', description: '', status: 'Planning', images: 0 });
    }
  };

  const deleteProject = (id) => {
    setProjects(projects.filter(project => project.id !== id));
  };

  const getStatusColor = (status) => {
    const colors = {
      'Planning': '#9c27b0',
      'In Progress': '#2196f3',
      'Completed': '#4caf50',
      'On Hold': '#ff9800'
    };
    return colors[status] || '#999';
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', padding: '40px 20px' }}>
      <Link href="/">
        <a style={{ color: 'white', textDecoration: 'none', fontSize: '14px', marginBottom: '20px', display: 'inline-block' }}>← Back to Dashboard</a>
      </Link>
      
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ color: 'white', fontSize: '32px', fontWeight: 'bold', marginBottom: '30px' }}>📷 Photography Projects</h1>
        
        {/* Add Project Form */}
        <div style={{ background: 'white', borderRadius: '12px', padding: '24px', marginBottom: '30px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px' }}>Create New Project</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', marginBottom: '16px' }}>
            <input
              type="text"
              placeholder="Project Title"
              value={newProject.title}
              onChange={(e) => setNewProject({...newProject, title: e.target.value})}
              style={{ padding: '12px', border: '2px solid #e0e0e0', borderRadius: '8px', fontSize: '16px' }}
            />
            <input
              type="text"
              placeholder="Description"
              value={newProject.description}
              onChange={(e) => setNewProject({...newProject, description: e.target.value})}
              style={{ padding: '12px', border: '2px solid #e0e0e0', borderRadius: '8px', fontSize: '16px' }}
            />
            <select
              value={newProject.status}
              onChange={(e) => setNewProject({...newProject, status: e.target.value})}
              style={{ padding: '12px', border: '2px solid #e0e0e0', borderRadius: '8px', fontSize: '16px' }}
            >
              <option>Planning</option>
              <option>In Progress</option>
              <option>Completed</option>
              <option>On Hold</option>
            </select>
            <input
              type="number"
              placeholder="Number of Images"
              value={newProject.images}
              onChange={(e) => setNewProject({...newProject, images: e.target.value})}
              style={{ padding: '12px', border: '2px solid #e0e0e0', borderRadius: '8px', fontSize: '16px' }}
            />
          </div>
          <button
            onClick={addProject}
            style={{ background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', color: 'white', padding: '14px 28px', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: '600', cursor: 'pointer', width: '100%' }}
          >
            Add Project
          </button>
        </div>

        {/* Projects Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
          {projects.map(project => (
            <div key={project.id} style={{ background: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', position: 'relative' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '16px' }}>
                <span style={{
                  background: getStatusColor(project.status),
                  color: 'white',
                  padding: '6px 16px',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: '600'
                }}>
                  {project.status}
                </span>
                <button
                  onClick={() => deleteProject(project.id)}
                  style={{ background: '#ff4444', color: 'white', border: 'none', borderRadius: '6px', padding: '6px 12px', cursor: 'pointer', fontSize: '12px' }}
                >
                  Delete
                </button>
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '8px', color: '#333' }}>{project.title}</h3>
              <p style={{ color: '#666', fontSize: '14px', lineHeight: '1.5', marginBottom: '16px' }}>{project.description}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '16px', borderTop: '1px solid #e0e0e0' }}>
                <div>
                  <p style={{ fontSize: '12px', color: '#999', marginBottom: '4px' }}>Date</p>
                  <p style={{ fontSize: '14px', fontWeight: '600', color: '#333' }}>{project.date}</p>
                </div>
                <div>
                  <p style={{ fontSize: '12px', color: '#999', marginBottom: '4px' }}>Images</p>
                  <p style={{ fontSize: '14px', fontWeight: '600', color: '#333' }}>{project.images}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
