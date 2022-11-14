import { useState } from 'react';
export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  //for storing and changing mode history
  const [history, setHistory] = useState([initial]);

  //change mode and add new mode to history array
  const transition = (newMode, shouldReplace = false) => {
    setMode(newMode);
    if (shouldReplace) {
      //remove the last item in history and add new mode
      setHistory((prev) => [...prev.slice(0, prev.length - 1), newMode]);
    } else {
      setHistory((prev) => [...prev, newMode]);
    }
  };

  //change mode and remove the last item in history array
  const back = () => {
    if (history.length > 1) {
      setMode(history[history.length - 2]);
      setHistory(history.slice(0, history.length - 1));
    }
  };
  return { mode, transition, back };
}
