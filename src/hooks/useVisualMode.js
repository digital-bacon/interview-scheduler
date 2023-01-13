import React, { useState } from "react";

const useVisualMode = (initial) => {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  // console.log('history: ', history);

  const removeLastFromHistory = () => {
    if (history.length > 0) {
      return history.pop();
    }
  }
  
  const transition = (newMode, replace = false) => {
    // When replace is true then set the history to reflect that we are replacing the current mode.
    if (replace) {
      removeLastFromHistory();
    }

    setHistory(() => [ ...history, newMode ]);
    setMode(() => newMode);
  };

  const back = () => {
    removeLastFromHistory();
    let newMode = initial;
    if (history.length > 0) {
      newMode = history[history.length - 1]
    }

    setMode(() => newMode);
  };

  return { 
    mode,
    transition,
    back,
   };
};

export default useVisualMode;