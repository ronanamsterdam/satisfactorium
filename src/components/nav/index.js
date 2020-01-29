import React, { Suspense } from "react";
import { StaticQuery, graphql } from "gatsby"

import { useLocale, useView } from 'src/utils/hooks';

export default function(props) {

    const {locale, isLocaleUpdating} = useLocale(__dirname)
    const {View, isMobile} = useView(__dirname)

    return <StaticQuery
        query={graphql`
          query NavLinksQuery {
            site {
              siteMetadata {
                nav {
                  text
                  href
                }
              }
            }
          }
        `}
        render={data => {
          return (
            <Suspense fallback={<div
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
              ></div></div>}
            >
              <View {...props} links={data.site.siteMetadata.nav || []} isLocaleUpdating={isLocaleUpdating} locale={locale}/>
            </Suspense>
          )
        }}
      />
}