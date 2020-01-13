import React, { Suspense, lazy, useState, useEffect } from "react";
import { useSelector } from "react-redux";

import {updateLocale} from 'src/utils/locale';
import {DEVICE_FORM_FACTORS}    from 'statics/strings/reducers/ux';

export default function(props) {
    const {factor} = useSelector(state => state.root.ux.device);
    const isMobile = factor === DEVICE_FORM_FACTORS.MOBILE || factor === DEVICE_FORM_FACTORS.TABLET

    const selectedLocale = useSelector(store => store.root.ux.locale.selected);
    // eslint-disable-next-line
    const [_, setUpdatingLocale] = useState(false);
    useEffect(() => {
      setUpdatingLocale(true)
      updateLocale({
        rootKey:    'nav',
        code:   selectedLocale.code,
        path:       'components/nav/l18n',
        cb:         () => setUpdatingLocale(false),
      })
    }, [selectedLocale]);

    const View = lazy(() => isMobile ?
      import('./mobile') : import('./desktop'))

    return <Suspense fallback={<div
      style={ isMobile ? {}:{width: '50px'}}>
      <div
        style={ isMobile ?
          {
            background: 'var(--brand-main)',
            bottom: 0,
            height: '50px',
            left: 0,
            position: 'fixed',
            right: 0,
            zIndex: 1000,
          }:{
            background: 'var(--brand-main)',
            bottom: 0,
            position: 'fixed',
            top: 0,
            width: '50px'
        }}
      ></div>></div>}>
        <View {...props} locale={selectedLocale}/>
      </Suspense>
}