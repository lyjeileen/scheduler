import React, { useState } from 'react';
export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  const transition = (newMode, shouldReplace = false) => {
    setMode(newMode);
    if (shouldReplace) {
      setHistory((prev) => [...prev.slice(0, prev.length - 1), newMode]);
    } else {
      setHistory((prev) => [...prev, newMode]);
    }
  };
  const back = () => {
    if (history.length > 1) {
      setMode(history[history.length - 2]);
      setHistory(history.slice(0, history.length - 1));
    }
  };
  return { mode, transition, back };
}
