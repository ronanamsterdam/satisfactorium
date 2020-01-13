import React, { useState, useEffect } from "react";

import {localize} from 'src/utils/locale';
const localeKey = 'squares';

export default function() {

  let [frameTimeState, setFrameTimeState] = useState({
    fps: 0,
    // better use performance.now()
    // but some static generators like gatsby
    // might have problems with that
    lastStamp: Date.now(),
    framesCount: 0
  });

  const requestRef = requestAnimationFrame(() => {
    const shouldSetState = Date.now() - frameTimeState.lastStamp > 1000;

    setFrameTimeState({
      lastStamp: shouldSetState ? Date.now() : frameTimeState.lastStamp,
      framesCount: shouldSetState ? 0 : (frameTimeState.framesCount + 1),
      fps: shouldSetState ? frameTimeState.framesCount + 1 : frameTimeState.fps
    });
  });

  useEffect(() => () => cancelAnimationFrame(requestRef), [frameTimeState]);

  return <>{frameTimeState.fps} {localize(`${localeKey}.fps`)}</>
}