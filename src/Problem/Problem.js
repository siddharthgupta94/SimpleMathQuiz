import React from "react";
import Expression from "../Expression/Expression";

const Problem = (props) => {
  const { count, exp, handleChange, handleNext, userInput, style } = props;
  return (
    <div className="Problem" style={style}>
      <h3>Problem {count}</h3>
      <Expression exp={exp} />
      <input
        ref={(input) => input && input.focus()}
        autoFocus
        value={userInput}
        onChange={(e) => handleChange(e)}
      />
      <button className="Quiz-next" onClick={(e) => handleNext(e)}>
        Next
      </button>
    </div>
  );
};

export default Problem;
