import React, { useState } from "react";
import style            from "./style.module.less";

import Square from "./sqaure";

export default function() {
  // const min = 1;
  const [count] = useState(100);

  return (
    <div className={style.container}>
      <div className={style.content}>
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
                    const isBomb = !!Math.round(Math.random());
                    return (
                            // TODO: random active state calc
                            <Square
                              idx={idx}
                              isActive={isActive}
                              isBomb={isBomb}
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