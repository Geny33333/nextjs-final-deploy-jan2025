import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [stats, setStats] = useState({ completed: 0, pending: 0, total: 0 });

  useEffect(() => {
    const savedTasks = localStorage.getItem('studySyncTasks');
    if (savedTasks) {
      const parsedTasks = JSON.parse(savedTasks);
      setTasks(parsedTasks);
      updateStats(parsedTasks);
    }
  }, []);

  const updateStats = (taskList) => {
    const completed = taskList.filter(t => t.completed).length;
    const total = taskList.length;
    setStats({ completed, pending: total - completed, total });
  };

  const addTask = () => {
    if (newTask.trim()) {
      const updatedTasks = [...tasks, { id: Date.now(), text: newTask, completed: false, date: new Date().toLocaleDateString() }];
      setTasks(updatedTasks);
      localStorage.setItem('studySyncTasks', JSON.stringify(updatedTasks));
      setNewTask('');
      updateStats(updatedTasks);
    }
  };

  const toggleTask = (id) => {
    const updatedTasks = tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
    setTasks(updatedTasks);
    localStorage.setItem('studySyncTasks', JSON.stringify(updatedTasks));
    updateStats(updatedTasks);
  };

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter(t => t.id !== id);
    setTasks(updatedTasks);
    localStorage.setItem('studySyncTasks', JSON.stringify(updatedTasks));
    updateStats(updatedTasks);
  };

  return (
    <div style={styles.container}>
      <Head>
        <title>StudySync - Your Academic Hub</title>
        <meta name="description" content="Manage your school, photography, and college activities" />
      </Head>

      <nav style={styles.nav}>
        <h1 style={styles.logo}>📚 StudySync</h1>
        <div style={styles.navLinks}>
          <Link href="/"><a style={styles.navLink}>Dashboard</a></Link>
          <Link href="/calendar"><a style={styles.navLink}>Calendar</a></Link>
          <Link href="/notes"><a style={styles.navLink}>Notes</a></Link>
          <Link href="/grades"><a style={styles.navLink}>Grades</a></Link>
          <Link href="/photography"><a style={styles.navLink}>Photography</a></Link>
          <Link href="/college"><a style={styles.navLink}>College</a></Link>
        </div>
      </nav>

      <main style={styles.main}>
        <h2 style={styles.heading}>Welcome back! 👋</h2>
        <p style={styles.subheading}>Your productivity dashboard</p>

        <div style={styles.statsGrid}>
          <div style={{...styles.statCard, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>
            <div style={styles.statNumber}>{stats.total}</div>
            <div style={styles.statLabel}>Total Tasks</div>
          </div>
          <div style={{...styles.statCard, background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'}}>
            <div style={styles.statNumber}>{stats.completed}</div>
            <div style={styles.statLabel}>Completed</div>
          </div>
          <div style={{...styles.statCard, background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'}}>
            <div style={styles.statNumber}>{stats.pending}</div>
            <div style={styles.statLabel}>Pending</div>
          </div>
          <div style={{...styles.statCard, background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'}}>
            <div style={styles.statNumber}>{stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0}%</div>
            <div style={styles.statLabel}>Progress</div>
          </div>
        </div>

        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Quick Tasks</h3>
          <div style={styles.taskInput}>
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTask()}
              placeholder="Add a new task..."
              style={styles.input}
            />
            <button onClick={addTask} style={styles.addButton}>Add</button>
          </div>
          <div style={styles.taskList}>
            {tasks.length === 0 ? (
              <p style={styles.emptyState}>No tasks yet. Add your first task above!</p>
            ) : (
              tasks.map(task => (
                <div key={task.id} style={styles.taskItem}>
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                    style={styles.checkbox}
                  />
                  <span style={{...styles.taskText, textDecoration: task.completed ? 'line-through' : 'none', opacity: task.completed ? 0.6 : 1}}>
                    {task.text}
                  </span>
                  <span style={styles.taskDate}>{task.date}</span>
                  <button onClick={() => deleteTask(task.id)} style={styles.deleteButton}>🗑️</button>
                </div>
              ))
            )}
          </div>
        </div>

        <div style={styles.featuresGrid}>
          <Link href="/calendar">
            <a style={{...styles.featureCard, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>
              <div style={styles.featureIcon}>📅</div>
              <h3 style={styles.featureTitle}>Calendar & Timetable</h3>
              <p style={styles.featureDesc}>Manage your schedule and deadlines</p>
            </a>
          </Link>
          <Link href="/notes">
            <a style={{...styles.featureCard, background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'}}>
              <div style={styles.featureIcon}>📝</div>
              <h3 style={styles.featureTitle}>Study Notes</h3>
              <p style={styles.featureDesc}>Organize your notes and materials</p>
            </a>
          </Link>
          <Link href="/grades">
            <a style={{...styles.featureCard, background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'}}>
              <div style={styles.featureIcon}>📊</div>
              <h3 style={styles.featureTitle}>Grades Tracker</h3>
              <p style={styles.featureDesc}>Monitor your academic performance</p>
            </a>
          </Link>
          <Link href="/photography">
            <a style={{...styles.featureCard, background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'}}>
              <div style={styles.featureIcon}>📸</div>
              <h3 style={styles.featureTitle}>Photography</h3>
              <p style={styles.featureDesc}>Manage your photography projects</p>
            </a>
          </Link>
          <Link href="/college">
            <a style={{...styles.featureCard, background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'}}>
              <div style={styles.featureIcon}>🎓</div>
              <h3 style={styles.featureTitle}>College Planning</h3>
              <p style={styles.featureDesc}>Track applications and deadlines</p>
            </a>
          </Link>
        </div>
      </main>

      <style jsx global>{`
        * {
          box-sizing: border-box;
        }
        body {
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
          background: #0f172a;
          color: #ffffff;
        }
        a {
          text-decoration: none;
          color: inherit;
        }
      `}</style>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    background: '#0f172a',
  },
  nav: {
    padding: '1.5rem 2rem',
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(10px)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  logo: {
    margin: 0,
    fontSize: '1.5rem',
    fontWeight: 'bold',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  navLinks: {
    display: 'flex',
    gap: '2rem',
    flexWrap: 'wrap',
  },
  navLink: {
    padding: '0.5rem 1rem',
    borderRadius: '8px',
    transition: 'all 0.3s',
    cursor: 'pointer',
  },
  main: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem',
  },
  heading: {
    fontSize: '2.5rem',
    marginBottom: '0.5rem',
  },
  subheading: {
    fontSize: '1.1rem',
    color: '#94a3b8',
    marginBottom: '2rem',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1.5rem',
    marginBottom: '3rem',
  },
  statCard: {
    padding: '2rem',
    borderRadius: '16px',
    color: 'white',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
  },
  statNumber: {
    fontSize: '3rem',
    fontWeight: 'bold',
    marginBottom: '0.5rem',
  },
  statLabel: {
    fontSize: '0.9rem',
    opacity: 0.9,
  },
  section: {
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '16px',
    padding: '2rem',
    marginBottom: '3rem',
    border: '1px solid rgba(255, 255, 255, 0.1)',
  },
  sectionTitle: {
    fontSize: '1.5rem',
    marginBottom: '1.5rem',
  },
  taskInput: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '1.5rem',
  },
  input: {
    flex: 1,
    padding: '0.75rem 1rem',
    borderRadius: '8px',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    background: 'rgba(255, 255, 255, 0.05)',
    color: 'white',
    fontSize: '1rem',
  },
  addButton: {
    padding: '0.75rem 2rem',
    borderRadius: '8px',
    border: 'none',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'transform 0.2s',
  },
  taskList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  },
  taskItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '1rem',
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '8px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
  },
  checkbox: {
    width: '20px',
    height: '20px',
    cursor: 'pointer',
  },
  taskText: {
    flex: 1,
  },
  taskDate: {
    fontSize: '0.85rem',
    color: '#94a3b8',
  },
  deleteButton: {
    padding: '0.5rem',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1.2rem',
  },
  emptyState: {
    textAlign: 'center',
    padding: '3rem',
    color: '#94a3b8',
  },
  featuresGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1.5rem',
  },
  featureCard: {
    padding: '2rem',
    borderRadius: '16px',
    color: 'white',
    display: 'block',
    transition: 'transform 0.3s, box-shadow 0.3s',
    cursor: 'pointer',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
  },
  featureIcon: {
    fontSize: '3rem',
    marginBottom: '1rem',
  },
  featureTitle: {
    fontSize: '1.25rem',
    marginBottom: '0.5rem',
  },
  featureDesc: {
    fontSize: '0.9rem',
    opacity: 0.9,
  },
};
