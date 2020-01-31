import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { useLocale } from 'common/utils/hooks';
import { localize } from 'common/utils/locale';

import actions from 'src/actions'
import {device}    from 'common/statics';

import Vl from 'common/components/loaders/view';

import Square from "../square";
import Timer from "./timer";

import style            from "./style.module.less";

const localeKey = 'squareGameStats';

export default function() {
  const {isLocaleUpdating} = useLocale(__dirname)

  const dispatch = useDispatch();
  const [isStart, setIsStart] = useState(false)
  const {factor} = useSelector(state => state.root.ux.device);

  const isMobile = factor === device.DEVICE_FORM_FACTORS.MOBILE || factor === device.DEVICE_FORM_FACTORS.TABLET;

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
  }, [factor, dispatch, isMobile, lvl])

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
              <Vl loading={isLocaleUpdating}>
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
              </Vl>
            </div>
            {!isMobile && <div
              className={style.objectiveColumn}
            >
              <Vl loading={isLocaleUpdating}>
                <span>{localize(`${localeKey}.text1`)}</span>
              </Vl>
              <Square
                id="stats-square"
                disabled={true}
                isActive={true}
              />
              <Vl loading={isLocaleUpdating}>
                <span>{localize(`${localeKey}.text2`)}</span>
              </Vl>
              <Vl loading={isLocaleUpdating}>
                <span><b>{localize(`${localeKey}.proTip`)} #1:</b> {localize(`${localeKey}.text3`)}</span>
                <span><b>{localize(`${localeKey}.proTip`)} #2:</b> {localize(`${localeKey}.text4`)}</span>
              </Vl>
            </div>}
            {!isMobile && <div
              className={style.objectiveColumn}
            >
              <Vl loading={isLocaleUpdating}>
                <h3>{localize(`${localeKey}.totalTodo`)}: {totalSquares}</h3>
                <h3>{isDone && "🥳"} {localize(`${localeKey}.circlesDone`)}: {activeSquares.length}</h3>
                <h3>{localize(`${localeKey}.bombBlasted`)}: {bombsBlasted}</h3>
                <h3>{localize(`${localeKey}.bombRadius`)}: {bombRadius}</h3>
              </Vl>
            </div>}
          </div>
              <div
                className={style.buttonsHolder}
              >
                <button
                disabled={lvl === 1}
                onClick={()=> dispatch(actions.prevLevel())}
                ><Vl loading={isLocaleUpdating}>⇤ {localize(`${localeKey}.previous`)}</Vl></button>
                <button
                onClick={()=> dispatch(actions.restartLevel())}
                ><Vl loading={isLocaleUpdating}>{localize(`${localeKey}.restart`)} </Vl></button>
                <button
                disabled={!isDone && !bestTime}
                onClick={()=> dispatch(actions.nextLevel())}
                ><Vl loading={isLocaleUpdating}>{localize(`${localeKey}.next`)} ⇥</Vl></button>
              </div>
        </div>
      </div>
    </>
  )
}