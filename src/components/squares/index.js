import React, { useState, useEffect }  from 'react';
import { useSelector } from "react-redux";

import {localize, updateLocale} from 'src/utils/locale';

import Square from './square';
import Fps from './fps';

import style                from './style.module.less';

const localeKey = 'squares';

export default function() {
  const min = 1;
  const [count, setCount] = useState(400);

  const selectedLocale = useSelector(store => store.root.ux.locale.selected);
  // eslint-disable-next-line
  const [_, setUpdatingLocale] = useState(false);
  useEffect(() => {
    setUpdatingLocale(true);
    updateLocale({
      rootKey:    localeKey,
      code:       selectedLocale.code,
      path:       'components/squares/l18n',
      cb:         () => setUpdatingLocale(false),
    })
  }, [selectedLocale]);

  return (
    <div className={style.container}>
      <div className={style.content}>
          <h3>
            <p>{localize(`${localeKey}.text1`)}</p>
          </h3>
          <p>
            {localize(`${localeKey}.text2`)}
            {localize(`${localeKey}.text3`)}
            {localize(`${localeKey}.text4`)}
          </p>
          <h1 className={style.fps}><p><Fps/></p></h1>
          <div className={style.inputContainer}>
            <label htmlFor="count-input"> {localize(`${localeKey}.text5`)} -> </label>
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