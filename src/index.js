import React, { useEffect, useState, useCallback } from 'react';
import ReactDOM from 'react-dom';

import Habit from './components/Habit';
import Wrapper from './components/Wrapper';
import Goal from "./components/Goal";
import './styles.scss';

const App = () => {
    const [newHabitName, setNewHabitName] = useState("");
    const [newGoalName, setNewGoalName] = useState("");
    const [newGoalEffort, setNewGoalEffort] = useState("");
    const [newGoalPriority, setNewGoalPriority] = useState("");
    const [showCompletedGoals, setShowCompletedGoals] = useState(false);
    const [showDormantHabits, setShowDormantHabits] = useState(false);

    const [state, setState] = useState({ habits: [], goals: [] });

    const loadStateFromJson = useCallback(() => {
        fetch('http://localhost:9001/state')
            .then(response => response.json())
            .then(data => setState(data))
            .catch(err => console.error(err));
    }, [setState]);

    const saveStateToJson = useCallback(() => {
        fetch('http://localhost:9001/state', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(state)
        })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, [state]);

    useEffect(() => {
        loadStateFromJson();
    }, [loadStateFromJson]);

    const addHabit = useCallback((name) => {
        const habitsCopy = state && state.habits ? [...state.habits] : [];
        habitsCopy.push({
            name: name,
            streak: 0,
            maxStreak: 0,
            days: 0,
            dateStarted: new Date().toISOString().split('T')[0],
            isDormant: false
        });
        setState({ ...state, habits: habitsCopy });
    }, [state, setState]);

    const addGoal = useCallback((goal) => {
        const goalsCopy = state && state.goals ? [...state.goals] : [];
        goalsCopy.push(goal);
        setState({ ...state, goals: goalsCopy });
    }, [state, setState]);

    const completeGoal = useCallback((goalName) => {
        const goalIndex = state.goals.findIndex(goal => goal.name === goalName);
        if (goalIndex !== -1) {
            const completedGoal = {
                ...state.goals[goalIndex],
                completeDate: new Date().toISOString().split('T')[0]
            };
            const goalsCopy = [...state.goals];
            goalsCopy[goalIndex] = completedGoal;
            setState({ ...state, goals: goalsCopy });
        }
    }, [state, setState]);

    const continueHabitStreak = useCallback((index) => {
        const updatedHabit = {
            ...state.habits[index],
            streak: state.habits[index].streak + 1,
            maxStreak: state.habits[index].maxStreak === state.habits[index].streak ? state.habits[index].maxStreak + 1 : state.habits[index].maxStreak,
            days: state.habits[index].days + 1
        };
        const habitsCopy = [...state.habits];
        habitsCopy[index] = updatedHabit;
        setState({ ...state, habits: habitsCopy });
    }, [state, setState]);

    const breakHabitStreak = useCallback((index) => {
        const updatedHabit = { ...state.habits[index], streak: 0 };
        const habitsCopy = [...state.habits];
        habitsCopy[index] = updatedHabit;
        setState({ ...state, habits: habitsCopy });
    }, [state, setState]);

    const toggleHabitDormant = useCallback((index) => {
        const updatedHabit = { ...state.habits[index], isDormant: !state.habits[index].isDormant };
        const habitsCopy = [...state.habits];
        habitsCopy[index] = updatedHabit;
        setState({ ...state, habits: habitsCopy });
    }, [state, setState]);

    return (
        <Wrapper>
            <div className="habits-section">
                <h2>Active Habits</h2>
                {state.habits && state.habits.filter(habit => !habit.isDormant).map((habit, index) => {
                    return (
                        <div key={index} className="habit-item">
                            <Habit
                                name={habit.name}
                                streak={habit.streak}
                                maxStreak={habit.maxStreak}
                                days={habit.days}
                                dateStarted={habit.dateStarted}
                                continueStreakCallback={() => continueHabitStreak(index)}
                                breakStreakCallback={() => breakHabitStreak(index)}
                                toggleDormantCallback={() => toggleHabitDormant(index)}
                            />
                        </div>
                    );
                })}

                <h2 onClick={() => setShowDormantHabits(!showDormantHabits)} style={{ cursor: 'pointer' }}>
                    Dormant Habits {showDormantHabits ? '▲' : '▼'}
                </h2>
                {showDormantHabits && state.habits && state.habits.filter(habit => habit.isDormant).map((habit, index) => {
                    return (
                        <div key={index} className="habit-item">
                            <Habit
                                name={habit.name}
                                streak={habit.streak}
                                maxStreak={habit.maxStreak}
                                days={habit.days}
                                dateStarted={habit.dateStarted}
                                isDormant={true}
                                continueStreakCallback={() => continueHabitStreak(index)}
                                breakStreakCallback={() => breakHabitStreak(index)}
                                toggleDormantCallback={() => toggleHabitDormant(index)}
                            />
                        </div>
                    );
                })}
            </div>
            <div className="goals-section">
                <h2>Active Goals</h2>
                {state.goals && state.goals.filter(goal => !goal.completeDate).map((goal, index) => {
                    return (
                        <div key={index} className="goal-item">
                            <Goal
                                name={goal.name}
                                completeDate={goal.completeDate}
                                priority={goal.priority}
                                effort={goal.effort}
                                completeCallback={() => completeGoal(goal.name)}
                            />
                        </div>
                    );
                })}

                <h2 onClick={() => setShowCompletedGoals(!showCompletedGoals)}>
                    Completed Goals {showCompletedGoals ? '▲' : '▼'}
                </h2>
                {showCompletedGoals && state.goals && state.goals.filter(goal => goal.completeDate).map((goal, index) => {
                    return (
                        <div key={index} className="goal-item">
                            <Goal
                                name={goal.name}
                                completeDate={goal.completeDate}
                                priority={goal.priority}
                                effort={goal.effort}
                                completeCallback={() => { }}
                            />
                        </div>
                    );
                })}
            </div>
            <button onClick={loadStateFromJson}>Load</button>
            <button onClick={saveStateToJson}>Save</button>
            <div>
                <input
                    type="text"
                    value={newHabitName}
                    onChange={(e) => setNewHabitName(e.target.value)}
                    placeholder="New Habit Name"
                />
                <button onClick={() => addHabit(newHabitName)}>Add Habit</button>
            </div>
            <div>
                <input
                    type="text"
                    value={newGoalName}
                    onChange={(e) => setNewGoalName(e.target.value)}
                    placeholder="New Goal Name"
                />
                <input
                    type="text"
                    value={newGoalPriority}
                    onChange={(e) => setNewGoalPriority(e.target.value)}
                    placeholder="New Goal Priority"
                />
                <input
                    type="text"
                    value={newGoalEffort}
                    onChange={(e) => setNewGoalEffort(e.target.value)}
                    placeholder="New Goal Effort"
                />
                <button onClick={() => addGoal({ name: newGoalName, effort: newGoalEffort, priority: newGoalPriority, completeDate: null })}>Add Goal</button>
            </div>
        </Wrapper>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));