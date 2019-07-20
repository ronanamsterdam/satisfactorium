import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import style            from "./style.module.less";

import Square from "../sqaure";
import Timer from "./timer";

import actions from '../../../actions';

export default function() {

  const dispatch = useDispatch();

  const [isStart, setIsStart] = useState(false)

  const {totalSquares, activeSquares, bombsBlasted, bestTimes, lvl, probabilityFactor} = useSelector(state => state.squareGame);
  const isDone = totalSquares === activeSquares.length;

  useEffect(() => {
    setIsStart(false);
    const timeout = setTimeout(() => setIsStart(true) ,1000)
    return () => clearTimeout(timeout);
  }, [lvl, probabilityFactor])

  const onTimerCb = (time) => {
    if (isDone) {
      console.log("TIMORT: "+ totalSquares+"x"+  activeSquares.length + " in " + lvl);
    }
    isDone && dispatch(actions.levelDone({time, lvl}));
  }

  const bestTime = bestTimes[lvl] || null;

  return (
    <div className={style.container}>
      <div className={style.content}>

          <div className={[
            style.congrats,
            isDone ? style.visible: "",
          ].join(" ")}>
            <h1>🥳🥳 chicken dinner! 🥳🥳</h1>
          </div>
        <div
          className={style.objectiveStat}
        >
          <div
            className={style.objectiveColumn}
          >
            <h1>Level: {lvl}</h1>
            {!!bestTime && (<h2>best time: {bestTime.getUTCMinutes()}:{bestTime.getUTCSeconds()}:{parseInt(bestTime.getUTCMilliseconds()/10)}</h2>)}
            <Timer
              isDone={isDone}
              isStart={isStart}
              lvl={lvl}
              bestTime={bestTime}
              cb={onTimerCb}
            />
          </div>
          <div
            className={style.objectiveColumn}
          >
            <span>
            turn them all in to:
            </span>
            <Square
              disabled={true}
              isActive={true}
            />
            <span>
            by hovering <u><b>OR</b></u> clicking on them.
            </span>
            <span>
            <b>PRO TIP:</b> you can use your browser's zoom, width and go between the circles to avoid triggering bombs. Try hacking it the best you can 😉
            </span>
          </div>
          <div
            className={style.objectiveColumn}
          >
            <h3>
              total to do: {totalSquares}
            </h3>
            <h3>
              {isDone && "🥳"} circles done: {activeSquares.length}
            </h3>
            <h3>
              bombs blasted: {bombsBlasted}
            </h3>
          </div>
        </div>
            <div
              className={style.buttonsHolder}
            >
              <button
              disabled={lvl === 1}
              onClick={()=> dispatch(actions.prevLevel())}
              >⇤ Previous </button>
              <button
              onClick={()=> dispatch(actions.restartLevel())}
              > Restart </button>
              <button
              disabled={!isDone}
              onClick={()=> dispatch(actions.nextLevel())}
              >Next ⇥</button>
            </div>
      </div>
    </div>
  )
}