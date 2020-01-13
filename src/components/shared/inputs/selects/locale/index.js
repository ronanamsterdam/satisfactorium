import React from 'react'
import { useSelector, useDispatch } from 'react-redux';

import actions from 'src/actions';

import style from "./style.module.less"

export default function () {
  const dispatch = useDispatch();

  const locale = useSelector(state => state.root.ux.locale);
  const {selected, collection} = locale;

return <ul className={style.container}>
    {
      collection.map((l, idx) =>
        <li><button
          key={idx}
          className={selected.code === l.code ? style.selected : ''}
          onClick={()=>dispatch(actions.setLocale(idx))}>
          {l.name.toUpperCase()}
        </button></li>)
    }
  </ul>
}