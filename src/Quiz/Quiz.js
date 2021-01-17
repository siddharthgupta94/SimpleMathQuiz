import React, { useState, useEffect } from 'react';
import './Quiz.css';

function Quiz(props) {
  const [state, setState] = useState({
    hasStarted: true,
    hasFinished: false,
    problemCount: 1,
    range: 10,
    currentScore: 0,
    operators: ['+', '-', '*', '/'],
    expression: null,
    userInput: null
  });

  useEffect(() => {
    const generateExpression = () => {
      const { operators, range } = state;

      const operand1 = Math.floor(Math.random() * (range));
      const operand2 = Math.floor(Math.random() * (range));
      const operator = operand2 !== 0 ? operators[Math.floor(Math.random() * 4)] : operators[Math.floor(Math.random() * 3)];
      const exp = `${operand1} ${operator} ${operand2}`;
      return exp;
    }

    let exp = generateExpression();
    setState((prev) => ({ ...prev, expression: exp }));
  }, [state.problemCount]);

  const handleChange = ({ target }) => {
    const value = parseInt(target.value);
    if (typeof value === 'number') {
      setState(prev => ({ ...prev, userInput: value }));
    }
  }

  const evaluateExpression = () => parseInt(eval(state.expression)) === state.userInput;

  const handleNext = () => {
    let { hasFinished, problemCount, currentScore } = state;
    problemCount++;
    const isCorrect = evaluateExpression();
    currentScore = isCorrect ? currentScore + 1 : currentScore;
    hasFinished = !(problemCount <= 20);
    console.log(currentScore);
    if(hasFinished) {
      setState(prev => ({...prev, hasFinished: hasFinished, currentScore: currentScore}));
    } else {
      setState(prev => ({...prev, currentScore: currentScore, problemCount: problemCount}));
    }
  }

  return (
    <div className="Quiz">
      <h1>Simple Math Quiz</h1>
      <div className="Problem">
        <h3>Problem {state.problemCount}</h3>
        <p>What is the result of {state.expression}?</p>
        <input value={state.userInput} onChange={handleChange} />
      <button className="Quiz-next" onClick={handleNext}>Next</button>
      </div>
      <div className="Score">
        <h3>Score : {state.currentScore}</h3>
      </div>
    </div>
  );
}

export default Quiz;