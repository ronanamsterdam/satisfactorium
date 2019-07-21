import React, { useState }  from "react";
import style                from "./style.module.less";

import Square from "./sqaure";
import Fps from './fps';

export default function() {
  const min = 1;
  const [count, setCount] = useState(40);

  return (
    <div className={style.container}>
      <div className={style.content}>
        <h3>
          <p>
          this page is made to test latest react's (16.8.6) rendering capabilities
          </p>
          <p>
            try increasing the block's count bellow and try interacting with the squares.
            You'll see FPS frame drop at around ~4500 items count.
            You can set it to any number and watch the world burn <span role="img" aria-label="fire">🔥</span>
          </p>
        </h3>
        <Fps/>
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