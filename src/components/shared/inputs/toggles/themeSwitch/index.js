import React from "react"
import { useDispatch, useSelector } from "react-redux";

import actions from "src/actions";
import {THEMES}    from 'common/statics/theme';

import style from "./style.module.less"

export default function() {
  const dispatch = useDispatch();
  const theme = useSelector(state => state.root.ux.theme)

  const onToggleTheme = (e) => {
    const {checked} = e.target;
    if (checked) {
      dispatch(actions.setTheme(THEMES.DARK))
    } else {
      dispatch(actions.setTheme(THEMES.LIGHT))
    }
  }

  return <div className={style.container}>
    <input id="dark-light-switch" checked={theme === THEMES.DARK} onChange={onToggleTheme} type="checkbox"/>
    {/* eslint-disable-next-line */}
    <label htmlFor="dark-light-switch" ><span></span></label>
  </div>
}