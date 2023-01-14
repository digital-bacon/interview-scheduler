import { useState } from "react";

const useVisualMode = (initial) => {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  
  const copyOfHistoryWithoutLastIndex = () => [...history.slice(0, -1)];

  const copyOfHistory = () => [...history];

  const addToHistory = (newMode, replaceLast = false) => {
    const buffer = replaceLast ? copyOfHistoryWithoutLastIndex() : copyOfHistory();
    const bufferLastValue = [...buffer].pop();
    if (newMode !== bufferLastValue) {
      return setHistory([...buffer, newMode]);
    }

    return setHistory([...buffer]);
  }
  
  const transition = (newMode, replaceLast = false) => {
    addToHistory(newMode, replaceLast);
    setMode(newMode);
  };
  
  // Function that transitions to the previous mode in the history state
  const back = () => {
    const buffer = copyOfHistoryWithoutLastIndex();
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