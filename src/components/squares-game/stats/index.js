import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import style            from "./style.module.less";

import actions from '../../../actions';

import Square from "../sqaure";
import Timer from "./timer";

export default function() {

  const dispatch = useDispatch();

  const [isStart, setIsStart] = useState(false)

  const {totalSquares, activeSquares, bombsBlasted, bestTimes, lvl, probabilityFactor, bombRadius} = useSelector(state => ({
      ...state.squareGame,
      lvl: +state.squareGame.lvl
    })
  );

  const isDone = totalSquares === activeSquares.length;

  useEffect(() => {
    setIsStart(false);
    document.body.style.setProperty('--square-factor', lvl);
    const timeout = setTimeout(() => setIsStart(true) ,1000)
    return () => clearTimeout(timeout);
  }, [lvl, probabilityFactor])

  const onTimerCb = (time) => isDone && dispatch(actions.levelDone({time, lvl}));

  const bestTime = (bestTimes[lvl] && new Date(bestTimes[lvl])) || null;

  return (
    <div className={style.container}>
      <div className={style.content}>

          <div className={[
            style.congrats,
            isDone ? style.visible: "",
          ].join(" ")}>
            <h1>
              <span role="img"  aria-label="chicken dinner!">🥳🥳</span>
               chicken dinner!
              <span role="img"  aria-label="chicken dinner!">🥳🥳</span>
            </h1>
          </div>
        <div
          className={style.objectiveStat}
        >
          <div
            className={style.objectiveColumn}
          >
            <h1>Level: {lvl}</h1>
            {!!bestTime && (<h2>best time: {bestTime.getUTCMinutes()}:{bestTime.getUTCSeconds()}:{parseInt(bestTime.getUTCMilliseconds()/100)}</h2>)}
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
              id="stats-square"
              disabled={true}
              isActive={true}
            />
            <span>
            by hovering <u><b>OR</b></u> clicking on them.
            </span>
            <span>
            <b>PRO TIP #1:</b> you can use your browser's zoom, width and go between the circles to avoid triggering bombs. Try hacking it the best you can 😉
            </span>
            <span>
            <b>PRO TIP #2:</b> you can disarm the bomb by clicking/hovering on it again to prevent the damage
            </span>
            <span>
            <b>IMPORTANT:</b> Works on <b>desktop</b> only. Use your 🐁
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
            <h3>
              bomb radius: {bombRadius}
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
              disabled={!isDone && !bestTime}
              onClick={()=> dispatch(actions.nextLevel())}
              >Next ⇥</button>
            </div>
      </div>
    </div>
  )
}