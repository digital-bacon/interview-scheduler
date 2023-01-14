import { useState } from "react";

const useVisualMode = (initial) => {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const addToHistory = (newMode, replaceLast = false) => {
    const newHistory = replaceLast ? copyArray(history, dropLastIndex) : copyArray(history);
    const newHistoryLastValue = getLastElement(newHistory);
    if (newMode !== newHistoryLastValue) {
      return setHistory([...newHistory, newMode]);
    }

    return setHistory([...newHistory]);
  }
  
  const transition = (newMode, replaceLast = false) => {
    addToHistory(newMode, replaceLast);
    setMode(newMode);
  };
  
  // Function that transitions to the previous mode in the history state
  const back = () => {
    const newHistory = copyArray(history, dropLastIndex);
    const newMode = newHistory.length > 0 ? newHistory.pop() : initial;
    transition(newMode, true);
  };

  const dropLastIndex = array => array.slice(0, -1);

  const getLastElement = array => array[array.length - 1];

  const copyArray = (array, callback) => {
    const newArray = [...array];
    return callback ? callback(newArray) : newArray;
  }
  
  return {
    mode,
    transition,
    back,
   };
};

export default useVisualMode;