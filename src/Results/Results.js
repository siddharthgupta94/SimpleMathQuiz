import React from "react";
import Expression from "../Expression/Expression";
import "./Results.css";

function Results(props) {
  return (
    <div>
      {props.answers.map((answer) => (
        <div className={!answer.isCorrect ? "highlight" : ""}>
          <Expression exp={answer.expression} />
          <p>The answer is {parseInt(eval(answer.expression))}</p>
        </div>
      ))}
    </div>
  );
}

export default Results;
