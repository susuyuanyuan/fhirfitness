import React from 'react';
import Info from './Info';
import Workout from './Workout';
import './styles.css';

function App() {
  return (
    <div className="grid-container">
      <header className="header">
        <h1>10 Minute Daily Workout</h1>
      </header>
      <main>
        <div>
          <Info />
        </div>
        <div>
          <Workout />
        </div>
      </main>
    </div>
  );
}

export default App;
