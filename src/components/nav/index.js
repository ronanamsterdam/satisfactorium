import React, { Suspense } from "react";
import { useLocale, useView } from 'src/utils/hooks';

export default function(props) {

    const {locale, isLocaleUpdating} = useLocale(__dirname)
    const {View, isMobile} = useView(__dirname)

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
      ></div></div>}>
        <View {...props} isLocaleUpdating={isLocaleUpdating} locale={locale}/>
      </Suspense>
}