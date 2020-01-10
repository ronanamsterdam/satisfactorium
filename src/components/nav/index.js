import React, { useState, useEffect, Suspense, lazy } from "react";
import { useSelector } from "react-redux";

import {DEVICE_FORM_FACTORS}    from 'statics/strings/reducers/ux';

export default function(props) {
    const {factor} = useSelector(state => state.root.ux.device);

    const View = lazy(() => factor === DEVICE_FORM_FACTORS.MOBILE || factor === DEVICE_FORM_FACTORS.TABLET ?
      import('./mobile') : import('./desktop'))

    return <Suspense fallback={<div>Loading...</div>}>
        <View {...props}/>
      </Suspense>
}