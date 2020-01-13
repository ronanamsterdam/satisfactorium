import React, {useEffect, useState} from 'react';
import { useSelector } from 'react-redux';

import {localize, updateLocale} from 'src/utils/locale';
import {DEVICE_FORM_FACTORS}    from 'statics/strings/reducers/ux';

import ThemeSwitch from 'components/shared/inputs/toggles/themeSwitch';
import LocaleSelect from 'components/shared/inputs/selects/locale';

import style from "./style.module.less"

export default function () {
  const {factor} = useSelector(state => state.root.ux.device);
  const isMobile = factor === DEVICE_FORM_FACTORS.MOBILE || factor === DEVICE_FORM_FACTORS.TABLET;

  const selectedLocale = useSelector(store => store.root.ux.locale.selected);
  const [updatingLocale, setUpdatingLocale] = useState(false);

  useEffect(() => {
    setUpdatingLocale(true);
    updateLocale({
      rootKey:    'footer',
      code:   selectedLocale.code,
      path:       'components/footer/l18n',
      cb:         () => setUpdatingLocale(false),
    })
  }, [selectedLocale]);

  return <footer className={style.container}>
    <div className={style.content}>
      <span>
        © {new Date().getFullYear()}, {localize('footer.text1')} {` `}
      </span>
      <span>
        <a href="https://github.com/ronanamsterdam/satisfactorium" target="_blank" rel="noopener noreferrer">{localize('footer.link1')}</a> {localize('footer.text2')} <a href="https://www.linkedin.com/in/romanzhyliov">{localize('footer.link2')}</a>
      </span>
    </div>
    <ul className={style.settings}>
      <li><LocaleSelect/></li>
      <li>{isMobile && <ThemeSwitch />}</li>
    </ul>
  </footer>
}