import React from 'react';
import './styles.scss';

const Goals = ({name, completeDate, priority, effort, completeCallback}) => {
    return (
        <div className={`goal-card ${completeDate ? 'completed-goal' : ''}`}>
            <h3>{name}</h3>
            {!completeDate && <button onClick={completeCallback} className="complete-btn">Complete</button>}
            <div className="goal-info-field"><strong>Priority:</strong> {priority}</div>
            <div className="goal-info-field"><strong>Effort:</strong> {effort}</div>
            {completeDate && <div className="goal-info-field"><strong>Complete Date:</strong> {completeDate}</div>}
        </div>
    );
};

export default Goals;
