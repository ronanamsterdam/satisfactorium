import React from 'react';
import { Link } from "gatsby"

import style from './style.module.less';

export default function({isLink = true, path, children, subContent, ...props}) {
  return isLink ?
      <Link to={"/"+path}
        className={style.actionItem}
        {...props}>
          <div className={style.foreground}>
            {children}
            <span className={style.subContent}>{subContent}</span>
          </div>
          <div className={style.background} />
      </Link>
      :
      <button
        className={style.actionItem}
        {...props}>
          <div className={style.foreground}>
            {children}
            <span className={style.subContent}>{subContent}</span>
          </div>
          <div className={style.background} />
      </button>
}