import React from 'react'

import Big from './big';
import Small from './small';

export const VIEW_TYPES = {
  BIG: "BIG",
  SMALL: "SMALL"
}

export default function ({type = VIEW_TYPES.SMALL, loading = false, children, loadedClassName = ''}) {

  const LoaderView = type === VIEW_TYPES.BIG ? Big : Small

  return <>
    {loading && <LoaderView className={loadedClassName}/>}
    {!loading && <>{children}</>}
    </>
}