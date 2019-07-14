import React, { useState } from "react";
import style            from "./style.module.less";

import Square from "./sqaure";

export default function() {
  const min = 1;
  const [count, setCount] = useState(40);

  return (
    <div className={style.container}>
      <div className={style.content}>
        <div className={style.inputContainer}>
          <label htmlFor="count-input"> set blocks count here -> </label>
          <input
            id="count-input"
            value={count}
            type="number"
            onChange={(e)=> {
              const newVal = e && e.target && +e.target.value;
              if (!isNaN(newVal) && newVal > min) {
                setCount(e.target.value);
              } else {
                setCount(min);
              }
            }}
          />
          <div>

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
                    Array.from({length: count}, (v, i) => i).map((item,idx) => (
                            <Square
                              {...item}
                              key={idx}
                            />
                    ))
                }
            </div>
        </div>
      </div>
    </div>
  )
}