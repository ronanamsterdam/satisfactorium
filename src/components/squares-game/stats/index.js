import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import style            from "./style.module.less";

import Square from "../sqaure";

import actions from '../../../actions';

export default function() {
  // const min = 1;

  const dispatch = useDispatch()

  const {totalSquares, activeSquares, bombsBlasted} = useSelector(state => state.squareGame);

  const onExplode = (idx) => {
    // TODO
    // console.log("ON EXPLODE:"+idx);
    dispatch(actions.squareBlast(idx));
  }

  const onActivate = (idx) => {
    // TODO
    // console.log("onActivate:"+idx);
    dispatch(actions.squareActivate(idx))
  }

  const onDeactivate = (idx) => {
    // TODO
    // console.log("onDeactivate:"+idx);
    dispatch(actions.squareDeactivate(idx));
  }

  const isDone = totalSquares === activeSquares.length;

  return (
    <div className={style.container}>
      <div className={style.content}>

          <div className={[
            style.congrats,
            isDone ? style.visible: "",
          ].join(" ")}>
            <h1>🥳🥳 congratulations! 🥳🥳</h1>
          </div>

        <div
          className={style.objectiveStat}
        >
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
            by hovering or clicking on them.
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
      </div>
    </div>
  )
}