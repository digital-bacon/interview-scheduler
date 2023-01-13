import { useState } from "react";

const useVisualMode = (initial) => {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const getArrayWithoutLastElement = (array) => {
    if (array.length > 0) {
      return [ ...array.slice(0, -1) ];
    }
  
    return [ ...history ];
  }
  
  const getArrayLastValue = (array) => {
    if (array.length > 0) {
      return array[array.length -1];
    }
  }
  
  const addToHistory = (newMode, replaceLast = false) => {
    const buffer = replaceLast ? getArrayWithoutLastElement(history) : [ ...history ];
    if (newMode !== getArrayLastValue(buffer)) {
      return setHistory([ ...buffer, newMode ]);
    }

    return setHistory([ ...buffer ]);
  }
  
  const transition = (newMode, replaceLast = false) => {
    addToHistory(newMode, replaceLast);
    setMode(newMode);
  };
  
  // Function that transitions to the previous mode in the history state
  const back = () => {
    const buffer = getArrayWithoutLastElement(history);
    const newMode = buffer.length > 0 ? buffer.pop() : initial;
    transition(newMode, true);
  };
  
  return { 
    mode,
    transition,
    back,
   };
};

export default useVisualMode;