import React, { useState, useEffect } from "react";
import "./Quiz.css";
import Problem from "../Problem/Problem";
import Results from "../Results/Results";

function Quiz(props) {
  const { numberOfProblems, range, operators } = props;

  const [state, setState] = useState({
    hasStarted: true,
    hasFinished: false,
    problemCount: 0,
    currentScore: 0,
    expressions: [],
    userInput: "",
    answers: [],
  });

  let {
    problemCount,
    expressions,
    hasFinished,
    currentScore,
    userInput,
    answers,
  } = state;

  useEffect(() => {
    const generateExpression = () => {
      const operand1 = Math.floor(Math.random() * range);
      const operand2 = Math.floor(Math.random() * range);
      const operator = operators[Math.floor(Math.random() * operators.length)];
      if (operand2 === 0) {
        while (operator == "/") {
          operator = operators[Math.floor(Math.random() * operators.length)];
        }
      }
      const exp = `${operand1} ${operator} ${operand2}`;
      return exp;
    };

    expressions.push(generateExpression());
    setState((prev) => ({ ...prev, expressions: expressions }));
  }, [problemCount]);

  const handleChange = ({ target }) => {
    const value = target.value;
    setState((prev) => ({ ...prev, userInput: value }));
  };

  const evaluateExpression = () =>
    // eslint-disable-next-line
    parseInt(eval(expressions[problemCount])) === parseInt(userInput);

  const handleNext = () => {
    const isCorrect = evaluateExpression();
    answers.push({
      expression: expressions[problemCount],
      isCorrect: isCorrect,
    });
    currentScore = isCorrect ? currentScore + 1 : currentScore;
    if (problemCount === numberOfProblems - 1) {
      setState((prev) => ({
        ...prev,
        hasFinished: true,
        currentScore: currentScore,
      }));
    } else {
      problemCount++;
      setState((prev) => ({
        ...prev,
        userInput: "",
        currentScore: currentScore,
        problemCount: problemCount,
      }));
    }
  };

  return (
    <div className="Quiz">
      <h1>Simple Math Quiz</h1>
      <Problem
        style={{ visibility: hasFinished && "hidden" }}
        count={problemCount + 1}
        exp={expressions[problemCount]}
        userInput={userInput}
        handleChange={handleChange}
        handleNext={handleNext}
      />
      <div className="Results">
        <h3>
          {hasFinished && "Final"} Score : {state.currentScore}
        </h3>
        {hasFinished && <Results answers={answers} />}
      </div>
    </div>
  );
}

export default Quiz;
