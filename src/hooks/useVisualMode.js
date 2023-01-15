import { useState } from "react";

const useVisualMode = (initial) => {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replaceLastMode = false) => {
    addToHistory(newMode, replaceLastMode);
    setMode(newMode);
  };

  const back = () => {
    const newMode = getPreviousMode();
    transition(newMode, true);
  };

  const addToHistory = (newMode, replaceLastMode = false, newBaseHistoryArray) => {
    if (replaceLastMode) {
      return replaceLastHistory(newMode);
    }
    
    const historyBuffer = !newBaseHistoryArray ? copyHistory() : [...newBaseHistoryArray];
    const isUniqueNewMode = isUniqueNewElement(newMode, historyBuffer);
    const newHistory =  isUniqueNewMode ? [...historyBuffer, newMode] : [...historyBuffer];
    setHistory(newHistory);
  };

  const replaceLastHistory = (newMode) => {
    const historyBuffer = copyHistory(dropLastIndex);
    addToHistory(newMode, false, historyBuffer);
  }

  const getPreviousMode = () => {
    if (history.length >= 2) {
      return history[history.length - 2];
    }
    
    return history[history.length - 1];
  }

  const copyHistory = (callback) => callback ? callback([...history]) : [...history];

  const isUniqueNewElement = (element, array) => element !== array[array.length - 1];

  const dropLastIndex = array => array.slice(0, -1);

  return {
    mode,
    transition,
    back,
   };
};

export default useVisualMode;