import React, { useState, useEffect } from 'react';

const Problem = (props) => {
  return (
    <div className="Problem">
        <h3>Problem {state.problemCount}</h3>
        <p>What is the result of {state.expression}?</p>
        <input value={state.userInput} onChange={handleChange} />
      <button className="Quiz-next" onClick={handleNext}>Next</button>
      </div>
  )
}