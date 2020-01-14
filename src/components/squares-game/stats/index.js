import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {localize, updateLocale} from 'src/utils/locale';

import actions from 'src/actions'
import {DEVICE_FORM_FACTORS}    from 'statics/strings/reducers/ux';

import Square from "../sqaure";
import Timer from "./timer";

import style            from "./style.module.less";

const localeKey = 'squareGameStats';

export default function() {

  const selectedLocale = useSelector(store => store.root.ux.locale.selected);
  // eslint-disable-next-line
  const [_, setUpdatingLocale] = useState(false);
  useEffect(() => {
    setUpdatingLocale(true);
    updateLocale({
      rootKey:    localeKey,
      code:       selectedLocale.code,
      path:       'components/squares-game/stats/l18n',
      cb:         () => setUpdatingLocale(false),
    })
  }, [selectedLocale]);

  const dispatch = useDispatch();
  const [isStart, setIsStart] = useState(false)
  const {factor} = useSelector(state => state.root.ux.device);

  const isMobile = factor === DEVICE_FORM_FACTORS.MOBILE || factor === DEVICE_FORM_FACTORS.TABLET;

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

  useEffect(() => {
    if (isMobile) {
      dispatch(actions.setLevelDelta(2))
      lvl === 1 && dispatch(actions.setTotalSquaresCount(30+2*(+lvl)))
    }
  }, [factor])

  const onTimerCb = (time) => isDone && dispatch(actions.levelDone({time, lvl}));

  const bestTime = (bestTimes[lvl] && new Date(bestTimes[lvl])) || null;

  return (
    <>
      <div className={[
        style.congrats,
        isDone ? style.visible: "",
      ].join(" ")}>
        <h1>
          <span role="img"  aria-label={localize(`${localeKey}.congrats`)}>🥳🥳</span>
            <br/>{localize(`${localeKey}.congrats`)}<br/>
          <span role="img"  aria-label={localize(`${localeKey}.congrats`)}>🥳🥳</span>
        </h1>
      </div>
      <div className={style.container}>
        {isMobile && <div className={style.hiddenSquare}>
            <Square
              id="stats-square"
              disabled={true}
              isActive={true}
            />
        </div>}
        <div className={style.content}>

          <div className={style.objectiveStat}>
            <div className={style.objectiveColumn}>
              <h1>{isMobile ? localize(`${localeKey}.lvl`): localize(`${localeKey}.level`)}: {lvl}</h1>
              {!!bestTime && (<h2>
                {localize(`${localeKey}.best`)}
                  {isMobile ? "":` ${localize(`${localeKey}.time`)}`} :
                  {/* TODO: just import moment 🤦🏻‍♂️ */}
                  {bestTime.getUTCMinutes()}:{bestTime.getUTCSeconds()}:{parseInt(bestTime.getUTCMilliseconds()/100)}
              </h2>)}
              <Timer
                isDone={isDone}
                isStart={isStart}
                lvl={lvl}
                bestTime={bestTime}
                cb={onTimerCb}
              />
            </div>
            {!isMobile && <div
              className={style.objectiveColumn}
            >
              <span>{localize(`${localeKey}.text1`)}</span>
              <Square
                id="stats-square"
                disabled={true}
                isActive={true}
              />
              <span>{localize(`${localeKey}.text2`)}</span>
              <span><b>{localize(`${localeKey}.proTip`)} #1:</b> {localize(`${localeKey}.text4`)}</span>
              <span><b>{localize(`${localeKey}.proTip`)} #2:</b> {localize(`${localeKey}.text4`)}</span>
            </div>}
            {!isMobile && <div
              className={style.objectiveColumn}
            >
              <h3>{localize(`${localeKey}.totalTodo`)}: {totalSquares}</h3>
              <h3>{isDone && "🥳"} {localize(`${localeKey}.circlesDone`)}: {activeSquares.length}</h3>
              <h3>{localize(`${localeKey}.bombBlasted`)}: {bombsBlasted}</h3>
              <h3>{localize(`${localeKey}.bombRadius`)}: {bombRadius}</h3>
            </div>}
          </div>
              <div
                className={style.buttonsHolder}
              >
                <button
                disabled={lvl === 1}
                onClick={()=> dispatch(actions.prevLevel())}
                >⇤ {localize(`${localeKey}.previous`)} </button>
                <button
                onClick={()=> dispatch(actions.restartLevel())}
                > {localize(`${localeKey}.restart`)} </button>
                <button
                disabled={!isDone && !bestTime}
                onClick={()=> dispatch(actions.nextLevel())}
                >{localize(`${localeKey}.next`)} ⇥</button>
              </div>
        </div>
      </div>
    </>
  )
}