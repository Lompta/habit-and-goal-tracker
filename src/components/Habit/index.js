import React from 'react';
import './styles.scss';

const getColor = (streak) => {
  if (streak >= 7) return 'green';
  if (streak >= 3) return 'yellow';
  return 'red';
}

const Habit = ({ name, streak, maxStreak, days, dateStarted, continueStreakCallback, breakStreakCallback }) => {
  const colorStyle = { color: getColor(streak) };

  return (
    <div className="habit-card" style={colorStyle}>
      <h3>{name}</h3>
      <div className="habit-info-field"><strong>Streak:</strong> {streak}</div>
      <div className="habit-info-field"><strong>Record:</strong> {maxStreak}</div>
      <div className="habit-info-field"><strong>Days Done:</strong> {days}</div>
      <div className="habit-info-field"><strong>Date Started:</strong> {dateStarted}</div>
      <div className="button-container">
        <button className="continue-streak" onClick={continueStreakCallback}>Continue Streak</button>
        <button className="break-streak" onClick={breakStreakCallback}>Break Streak</button>
      </div>
    </div>
  );
};

export default Habit;
