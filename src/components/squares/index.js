import React, { useState, useEffect }  from 'react';

import { useLocale } from 'common/utils/hooks';
import {localize} from 'common/utils/locale';

import Vl from 'common/components/loaders/view';

import Square from './square';
import Fps from './fps';

import style                from './style.module.less';

const localeKey = 'squares';

export default function() {
  const min = 1;
  const [count, setCount] = useState(40);

  const [size, setSize] = useState(1);

  useEffect(()=> {
    const el = document.body.querySelector(`.${style.container}`)
    if (!!el) {
      el.style.setProperty('--local-square-factor', size);
    }
  }, [size])

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
              {localize(`${localeKey}.text4_1`)} {localize(`${localeKey}.text4_2`)}
            </p>
          </Vl>
          <h1 className={style.fps}><Vl loading={isLocaleUpdating}><p><Fps/> {localize(`${localeKey}.fps`)}</p></Vl></h1>
          <ul className={style.inputContainer}>
            <li>
              <label htmlFor="count-input"><Vl loading={isLocaleUpdating}>{localize(`${localeKey}.text5`)} : </Vl></label>
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
            </li>
            <li>
              <label htmlFor="size-input"><Vl loading={isLocaleUpdating}>{localize(`${localeKey}.text5_1`)} : </Vl></label>
              <input
                id="size-input"
                value={size}
                type="number"
                onChange={(e)=> {
                  const newVal = e && e.target && +e.target.value;
                  if (!isNaN(newVal) && newVal > min) {
                    setSize(e.target.value);
                  } else {
                    setSize(min);
                  }
                }}
              />
            </li>
          </ul>
        <div className={style.resultsContainer}>
            <div className={
                [
                    style.localGrid,
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