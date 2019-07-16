import React from "react";
import { useSelector, useDispatch } from "react-redux";
import style            from "./style.module.less";

import Square from "./sqaure";
import Stats from "./stats";

import actions from "../../actions";

export default function() {
  const dispatch = useDispatch()
  const totalSquares = useSelector(state => state.squareGame.totalSquares);

  const onExplode = (idx) => dispatch(actions.squareBlast(idx));
  const onActivate = (idx) => dispatch(actions.squareActivate(idx));
  const onDeactivate = (idx) => dispatch(actions.squareDeactivate(idx));

  return (
    <div className={style.container}>
      <div className={style.content}>
        <Stats />
        <div
            className={style.resultsContainer}
        >
            <div className={
                [
                    style.grid,
                    style.searchResultsContainer,
                ].join(' ')
            }>
                {
                  Array.from({length: totalSquares}, (v, i) => i).map((item,idx) => {
                    const isActive = !!Math.round(Math.random());
                    const isBomb = !!Math.round(Math.random());
                    return (
                            // TODO: random active state calc
                            <Square
                              idx={idx}
                              isActive={isActive}
                              isBomb={isBomb}
                              onExplode={onExplode}
                              onActivate={onActivate}
                              onDeactivate={onDeactivate}
                              {...item}
                              key={idx}
                            />
                  )})
                }
            </div>
        </div>
      </div>
    </div>
  )
}