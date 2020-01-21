import React, {useState} from 'react';
import {useSelector} from 'redux';
import { Link } from "gatsby"

import {DEVICE_FORM_FACTORS}    from 'statics/strings/reducers/ux';

import style from './style.module.less';

export default function({isLink = true, path, children, ...props}) {
  return isLink ?
      <Link to={"/"+path}
        className={style.actionItem}
        {...props}>
          <div className={style.foreground}>
            {children}
          </div>
          <div className={style.background} />
      </Link>
      :
      <button
        className={style.actionItem}
        {...props}>
          {children}
      </button>
}