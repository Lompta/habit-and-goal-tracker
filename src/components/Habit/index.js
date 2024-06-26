import React from 'react';
import './styles.scss';

const getColor = (streak, isDormant) => {
  if (isDormant) return 'white';
  if (streak >= 100) return 'rainbow';
  if (streak >= 7) return 'green';
  if (streak >= 3) return 'yellow';
  return 'red';
}

const Habit = ({ name, streak, maxStreak, days, dateStarted, continueStreakCallback, breakStreakCallback, isDormant }) => {
  const rainbowStyle = {
    'background': "linear-gradient(90deg, red, orange, yellow, green, blue, indigo, violet)",
    '-webkit-background-clip': "text",
    '-webkit-text-fill-color': "transparent",
    'background-clip': "text",
    'text-fill-color': "transparent",
  }
  const colorStyle = { color: getColor(streak, isDormant) };
  const conditionalRainbowText = getColor(streak, isDormant) === 'rainbow' ? rainbowStyle : null;

  return (
    <div className="habit-card" style={colorStyle}>
      <h3 style={conditionalRainbowText}>{name}</h3>
      <div className="habit-info-field" style={conditionalRainbowText}><strong>Streak:</strong> {streak}</div>
      <div className="habit-info-field" style={conditionalRainbowText}><strong>Record:</strong> {maxStreak}</div>
      <div className="habit-info-field" style={conditionalRainbowText}><strong>Days Done:</strong> {days}</div>
      <div className="habit-info-field" style={conditionalRainbowText}><strong>Date Started:</strong> {dateStarted}</div>
      <div className="button-container">
        <button className="continue-streak" onClick={continueStreakCallback}>Continue Streak</button>
        <button className="break-streak" onClick={breakStreakCallback}>Break Streak</button>
      </div>
    </div>
  );
};

export default Habit;
