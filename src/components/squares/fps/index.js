import React, { useState, useEffect } from "react";

export default function() {

  let [frameTimeState, setFrameTimeState] = useState({
    fps: 0,
    lastStamp: Date.now(),
    framesCount: 0
  });

  useEffect(() => {
    // NOTE: timeout is here
    // cuz requestAnimationFrame is deferred
    // and to prevent set states on unmounted
    let timeout = null;

    requestAnimationFrame(() => timeout = setTimeout(()=>{

      const currentStamp = Date.now();
      const shouldSetState = currentStamp - frameTimeState.lastStamp > 1000;

      const newFramesCount = frameTimeState.framesCount + 1;

      if (shouldSetState) {
        setFrameTimeState({
          fps: frameTimeState.framesCount,
          lastStamp: currentStamp,
          framesCount: 0,
        });
      } else {
        setFrameTimeState({
          ...frameTimeState,
          framesCount: newFramesCount,
        });
      }
    },0));
    return () => timeout && clearTimeout(timeout);
  }, [frameTimeState])

  return <h1>{frameTimeState.fps} fps</h1>
}