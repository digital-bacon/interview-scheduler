import React, { useState } from "react";

const useVisualMode = (initial) => {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  // console.log('history: ', history);

  const transition = newMode => {
    setHistory(() => [ ...history, newMode ]);
    setMode(() => newMode);
  };

  const back = () => {
    if (history.length > 0) {
      const removed = history.pop();
      setHistory(() => [ ...history ])
    }
    
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