import React from 'react';
import { useSelector } from 'react-redux';

import { useLocale } from 'src/utils/hooks';
import {localize} from 'common/utils/locale';

import {DEVICE_FORM_FACTORS}    from 'statics/strings/reducers/ux';

import Vl from 'components/shared/loaders/view';

import ThemeSwitch from 'components/shared/inputs/toggles/themeSwitch';
import LocaleSelect from 'components/shared/inputs/selects/locale';

import style from "./style.module.less"

export default function () {
  const {factor} = useSelector(state => state.root.ux.device);
  const isMobile = factor === DEVICE_FORM_FACTORS.MOBILE || factor === DEVICE_FORM_FACTORS.TABLET;

  const {isLocaleUpdating} = useLocale(__dirname)

  return <footer className={style.container}>
    <div className={style.content}>
      <span>
        <Vl loading={isLocaleUpdating}>© {new Date().getFullYear()}, {localize('footer.text1')} {` `}</Vl>
      </span>
      <span>
        <Vl loading={isLocaleUpdating}>
          <a
            href="https://github.com/ronanamsterdam/satisfactorium"
            target="_blank" rel="noopener noreferrer">{localize('footer.link1')}</a>
            {localize('footer.text2')}
            <a href="https://www.linkedin.com/in/romanzhyliov">
                {localize('footer.link2')}
            </a>
        </Vl>
      </span>
    </div>
    <ul className={style.settings}>
      <li><LocaleSelect/></li>
      <li>{isMobile && <ThemeSwitch />}</li>
    </ul>
  </footer>
}