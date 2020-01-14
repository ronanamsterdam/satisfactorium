import React from 'react';

import Big from './big';
import Small from './small';

export const VIEW_TYPES = {
  BIG: "BIG",
  SMALL: "SMALL"
}

export default function ({type = VIEW_TYPES.SMALL, loading = false, children}) {

  const LoaderView = type === VIEW_TYPES.BIG ? Big : Small

  if (!children) {
    return <LoaderView/>
  } else {
    return loading ? <LoaderView/> : <>{children}</>
  }
}