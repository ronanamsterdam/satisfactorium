import React, { useState }  from 'react';

import { useLocale } from 'src/utils/hooks';
import {localize} from 'src/utils/locale';

import Vl from 'components/shared/loaders/view';

import Square from './square';
import Fps from './fps';

import style                from './style.module.less';

const localeKey = 'squares';

export default function() {
  const min = 1;
  const [count, setCount] = useState(40);

  const {isLocaleUpdating} = useLocale(__dirname)

  return (
    <div className={style.container}>
      <div className={style.content}>
          <h3>
          <Vl loading={isLocaleUpdating}><p>{localize(`${localeKey}.text1`)}</p></Vl>
          </h3>
          <Vl loading={isLocaleUpdating}>
            <p>
              {localize(`${localeKey}.text2`)}
              {localize(`${localeKey}.text3`)}
              {localize(`${localeKey}.text4`)}
            </p>
          </Vl>
          <h1 className={style.fps}><Vl loading={isLocaleUpdating}><p><Fps/> {localize(`${localeKey}.fps`)}</p></Vl></h1>
          <div className={style.inputContainer}>
            <label htmlFor="count-input"><Vl loading={isLocaleUpdating}>{localize(`${localeKey}.text5`)} -> </Vl></label>
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
        <div className={style.resultsContainer}>
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
                              key={idx}/>
                    ))
                }
            </div>
        </div>
      </div>
    </div>
  )
}