import React from 'react'
import posed, { PoseGroup } from 'react-pose';

import Big from './big';
import Small from './small';

const LoadedView = posed.div({
  enter: { opacity: 1, transition: { duration: 700 } },
  exit: { opacity: 0, transition: { duration: 700 } },
})

export const VIEW_TYPES = {
  BIG: "BIG",
  SMALL: "SMALL"
}

export default function ({type = VIEW_TYPES.SMALL, loading = false, children, loadedClassName = ''}) {

  const LoaderView = type === VIEW_TYPES.BIG ? Big : Small

  return <>
    {loading && <LoadedView pose="enter" initialPose="exit"><LoaderView/></LoadedView>}
    {!loading && <>{children}</>}
    </>
}