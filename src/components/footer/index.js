import React from 'react';
import { useSelector } from 'react-redux';

import {DEVICE_FORM_FACTORS}    from 'statics/strings/reducers/ux';

import ThemeSwitch from 'components/shared/inputs/toggles/themeSwitch';
import LocaleSelect from 'components/shared/inputs/selects/locale';

import style from "./style.module.less"

export default function () {
  const {factor} = useSelector(state => state.root.ux.device);

  const isMobile = factor === DEVICE_FORM_FACTORS.MOBILE || factor === DEVICE_FORM_FACTORS.TABLET

  return <footer className={style.container}>
    <div className={style.content}>
      <span>
        © {new Date().getFullYear()}, Check out whole project on my {` `}
      </span>
      <span>
        <a href="https://github.com/ronanamsterdam/satisfactorium" target="_blank" rel="noopener noreferrer">Github</a> or read <a href="https://www.linkedin.com/in/romanzhyliov">About Me</a>
      </span>
    </div>
    <ul className={style.settings}>
      <li><LocaleSelect/></li>
      <li>{isMobile && <ThemeSwitch />}</li>
    </ul>
  </footer>
}