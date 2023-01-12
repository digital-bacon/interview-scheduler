import React, { useState } from "react";

const useVisualMode = (initial) => {
  const [mode, setMode] = useState(initial);
  
  return { 
    mode,
    transition: newMode => setMode(newMode)
   };
};

export default useVisualMode;