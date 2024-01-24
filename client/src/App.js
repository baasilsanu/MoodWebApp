import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 

function App() {
  const [mood, setMood] = useState('');
  const [moodList, setMoodList] = useState([]);

  useEffect(() => {
    fetchMoods();
  }, []);

  const fetchMoods = () => {
    fetch('http://localhost:5000/mood')
      .then(response => response.json())
      .then(data => setMoodList(data));
  };

  const submitMood = () => {
    fetch('http://localhost:5000/mood', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ mood }),
    }).then(() => {
      setMood('');
      fetchMoods();
    });
  };

  const clearMoods = () => {
    fetch('http://localhost:5000/mood', {
      method: 'DELETE',
    }).then(() => {
      setMoodList([]);
    }).catch((error) => {
      console.error('Error:', error);
    });
  };

  return (
    <div style={{ backgroundImage: "url('https://images.pexels.com/photos/3964518/pexels-photo-3964518.jpeg?cs=srgb&dl=pexels-ready-made-3964518.jpg&fm=jpg&w=2832&h=4240&_gl=1*1wt0ngh*_ga*MTc4MzY1Mjc2LjE3MDYwODAzMjk.*_ga_8JE65Q40S6*MTcwNjA4MDMyOS4xLjEuMTcwNjA4MDU2My4wLjAuMA..')", backgroundSize: 'cover', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div>
        <div className="mb-3 text-center">
          <input
            type="text"
            className="form-control"
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            placeholder="How are you feeling today?"
          />
        </div>
        <div className="mb-3 text-center">
          <button className="btn btn-primary me-2" onClick={submitMood}>
            Log Mood
          </button>
          <button className="btn btn-danger" onClick={clearMoods}>
            Clear All Moods
          </button>
        </div>
        <ul className="list-group">
          {moodList.map((m, index) => (
            <li key={index} className="list-group-item">
              {m.mood} (logged at {new Date(m.timestamp).toLocaleString()})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
