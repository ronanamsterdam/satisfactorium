import React, {Suspense, lazy} from 'react';

import { useLocale } from 'common/utils/hooks';
import Vl, {VIEW_TYPES} from 'common/components/loaders/view'
import SEO from 'components/seo'

const localeKey = "twitterGiffer";

export default () => {
  const TwitterGiffer = lazy(() => import('apps/twitterGifExporter/src/app'))
  const {locale, isLocaleUpdating} = useLocale(__dirname)

  return (
    <>
      <SEO localeKey={localeKey}/>
      <Suspense fallback={<Vl type={VIEW_TYPES.BIG} />}>
        {/* TODO: this is not ideal -> any time parent state changes - whole view is re-rendering */}
        <Vl loading={isLocaleUpdating} type={VIEW_TYPES.BIG} >
          <TwitterGiffer locale={locale} isLocaleUpdating={isLocaleUpdating} />
        </Vl>
      </Suspense>
    </>
  )
}
