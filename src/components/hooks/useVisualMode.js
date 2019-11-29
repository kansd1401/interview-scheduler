import {useState} from "react"

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(initial, replace) {
    if(!replace){
      setHistory(prev => [...prev, initial])
      setMode(initial)
    }else{
      setMode(initial)
    }
  }

  function back(value) {
    if(history.length > 1){
      let newHistory = [...history]
      newHistory.pop()
      setHistory([...newHistory])
      setMode(history[history.length-2])
    }
  }
  return { mode,transition,back };
}