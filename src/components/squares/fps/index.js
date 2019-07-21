import React, { useState, useEffect } from "react";

export default function() {

  let [frameTimeState, setFrameTimeState] = useState({
    fps: 0,
    lastStamp: Date.now(),
    framesCount: 0
  });

  useEffect(() => {
    requestAnimationFrame(() => {

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
    })
  }, [frameTimeState])

  return <h1>{frameTimeState.fps} fps</h1>
}