import React, { useState, useEffect } from "react";

export default function({isDone = false, isStart = false, bestTime, initialDate = Date.now(), lvl = 1, cb = ()=>{}}) {

  const [startTime, setStartTime] = useState(initialDate);
  const [newTime, setNewTime] = useState(initialDate);

  const newTimeCurrent = new Date(Math.max(0, newTime - startTime));
  const isBest = bestTime &&
  (newTimeCurrent.getUTCMinutes() === bestTime.getUTCMinutes()) &&
  (newTimeCurrent.getUTCSeconds() === bestTime.getUTCSeconds());

  const date = (isDone && isBest && bestTime) || newTimeCurrent;

  useEffect(() => {
    const timer = !isDone && isStart && setTimeout(()=>{
      // in firefox timers sometimes can match!!
      // even after 1ms. and if react sees no change
      // -> the rendering loop will stop.
      // So to prevent that -> adding a floating
      // random number at the end
      setNewTime(Date.now() + Math.random());
    }, 1);
    return ()=>{isDone && cb(date); return timer && clearInterval(timer)};
  },[newTime, isDone, isStart]);

  useEffect(() => {
    setStartTime(Date.now());
  }, [lvl, isStart]);

  return isStart && <h1>{date.getUTCMinutes()}:{date.getUTCSeconds()}:{parseInt(date.getUTCMilliseconds()/100)}</h1>
}
