import React, { Suspense, lazy } from "react";
import { useSelector } from "react-redux";

import {DEVICE_FORM_FACTORS}    from 'statics/strings/reducers/ux';

export default function(props) {
    const {factor} = useSelector(state => state.root.ux.device);

    const isMobile = factor === DEVICE_FORM_FACTORS.MOBILE || factor === DEVICE_FORM_FACTORS.TABLET

    const View = lazy(() => isMobile ?
      import('./mobile') : import('./desktop'))

    return <Suspense fallback={<div
      style={ isMobile ? {}:{width: '50px'}}>
      <div
        style={ isMobile ?
          {
            background: '#f14ac2',
            bottom: 0,
            height: '50px',
            left: 0,
            position: 'fixed',
            right: 0,
            zIndex: 1000,
          }:{
            background: '#f14ac2',
            bottom: 0,
            position: 'fixed',
            top: 0,
            width: '50px'
        }}
      ></div>></div>}>
        <View {...props}/>
      </Suspense>
}