import React, { useState } from "react";
import Quiz from "../Quiz/Quiz";

function QuizForm(props) {
  const [hasStarted, setStarted] = useState(false);

  const [state, setState] = useState({
    numberOfProblems: undefined,
    range: undefined,
    operators: [],
  });

  const handleChange = ({ target }) => {
    const name = target.name;
    let value;
    if (name === "operators") {
      value = [...target.selectedOptions].map((opt) => opt.value);
    } else {
      value = parseInt(target.value);
    }

    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    const numberOfProblems = parseInt(state.numberOfProblems);
    const range = parseInt(state.range);

    if (numberOfProblems <= 0 || range <= 0) {
      alert("Enter a number greater than 0!");
      return;
    }
    if (state.operators.length == 0) {
      alert("Choose one or more operators!");
      return;
    }
    setStarted((prev) => true);
  };

  return (
    <div>
      {!hasStarted ? (
        <form onChange={handleChange}>
          <h1>Hello, Click Submit to start practicing!</h1>
          <p>Enter number of problems that you want to practice:</p>
          <input name="numberOfProblems" type="number" />
          <p>Enter the range of numbers that you want to practice:</p>
          <input name="range" type="number" />
          <p>Select the operators that you want to practice:</p>
          <select multiple={true} name="operators" value={state.operators}>
            <option value="+">+</option>
            <option value="-">-</option>
            <option value="*">*</option>
            <option value="/">/</option>
          </select>
          <br />
          <br />
          <button onClick={handleSubmit}>Submit</button>
        </form>
      ) : (
        <Quiz
          numberOfProblems={state.numberOfProblems}
          range={state.range}
          operators={state.operators}
        />
      )}
    </div>
  );
}

export default QuizForm;
