import { useState } from "react";

const useVisualMode = (initial) => {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const copyHistory = (callback) => {
    const newArray = [...history];
    return callback ? callback(newArray) : newArray;
  }

  const addToHistory = (newMode, replaceLastMode = false) => {
    const newHistory = replaceLastMode ? copyHistory(dropLastIndex) : copyHistory();
    const lastModeInHistory = getLastElement(newHistory);
    if (newMode !== lastModeInHistory) {
      return setHistory([...newHistory, newMode]);
    }

    return setHistory([...newHistory]);
  }
  
  const transition = (newMode, replaceLastMode = false) => {
    addToHistory(newMode, replaceLastMode);
    setMode(newMode);
  };
  
  const back = () => {
    const newMode = getPreviousMode();
    transition(newMode, true);
  };

  const dropLastIndex = array => array.slice(0, -1);

  const getLastElement = array => array[array.length - 1];

  const getPreviousMode = () => {
    if (history.length >= 2) {
      return history[history.length - 2];
    }
    
    return history[history.length - 1];
  }

  return {
    mode,
    transition,
    back,
   };
};

export default useVisualMode;