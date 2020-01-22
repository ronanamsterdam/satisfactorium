import React from 'react';
import { Link } from "gatsby"

import style from './style.module.less';

export const ActionView = ({isLink, children, ...props}) => {
  return isLink ? <Link {...props}>{children}</Link> : <button {...props}>{children}</button>
}

export default function({isLink = true, path, children, subContent, ...props}) {
  return <ActionView {...{isLink, to:"/"+path, className: style.actionItem, ...props}}>
    <div className={style.foreground}>
      {children}
      <span className={style.subContent}>{subContent}</span>
    </div>
    <div className={style.background} />
  </ActionView>
}