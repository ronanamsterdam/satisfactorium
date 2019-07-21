import React, { useState, useEffect } from "react";

export default function({isDone = false, isStart = false, bestTime, initialDate = new Date(), lvl = 1, cb = ()=>{}}) {

  const [startTime, setStartTime] = useState(initialDate.getTime());
  const [newTime, setNewTime] = useState(initialDate.getTime());

  const newTimeCurrent = new Date(Math.max(0, newTime - startTime));
  const isBest = bestTime &&
  (newTimeCurrent.getUTCMinutes() === bestTime.getUTCMinutes()) &&
  (newTimeCurrent.getUTCSeconds() === bestTime.getUTCSeconds());

  const date = (isDone && isBest && bestTime) || newTimeCurrent;

  useEffect(() => {
    const timer = !isDone && isStart && setTimeout(()=>{
      setNewTime(new Date().getTime());
    }, 1);
    return ()=>{isDone && cb(date); return timer && clearInterval(timer)};
  },[newTime, isDone, isStart]);

  useEffect(() => {
    setStartTime(new Date().getTime());
  }, [lvl, isStart]);

  return isStart && <h1>{date.getUTCMinutes()}:{date.getUTCSeconds()}:{parseInt(date.getUTCMilliseconds()/100)}</h1>
}
