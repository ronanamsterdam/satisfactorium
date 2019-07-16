import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import style            from "./style.module.less";

import Square from "./sqaure";

import actions from '../../actions';

export default function() {
  // const min = 1;

  const dispatch = useDispatch()
  const [count] = useState(100);

  const counts = useSelector(state => state.counts)

  const onExplode = (idx) => {
    // TODO
    // console.log("ON EXPLODE:"+idx);
  }

  const onActivate = (idx) => {
    // TODO
    // console.log("onActivate:"+idx);
    // dispatch(actions.appTestAction(idx))
  }

  const onDeactivate = (idx) => {
    // TODO
    // console.log("onDeactivate:"+idx);
  }

  return (
    <div className={style.container}>
      <div className={style.content}>
        <div
          className={style.objectiveStat}
        >
          <div
            className={style.objectiveColumn}
          >
            <span>
            turn them all in to {counts}:
            </span>
            <Square
              disabled={true}
              isActive={true}
            />
            <span>
            by hovering or clicking on them.
            </span>
          </div>
        </div>
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
                  Array.from({length: count}, (v, i) => i).map((item,idx) => {
                    const isActive = !!Math.round(Math.random());
                    isActive && onActivate(idx);
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