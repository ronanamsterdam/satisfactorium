import React, {Suspense, lazy} from 'react';

import { useLocale } from 'src/utils/hooks';
import SEO from 'components/seo'

const localeKey = "twitterGiffer";

export default () => {
  const TwitterGiffer = lazy(() => import('apps/twitterGifExporter/src/app'))
  const {locale, isLocaleUpdating} = useLocale(__dirname)

  return (
    <>
      <SEO localeKey={localeKey}/>
      <Suspense fallback={<div>loading stuff..</div>}>
        <TwitterGiffer locale={locale} isLocaleUpdating={isLocaleUpdating} />
      </Suspense>
    </>
  )
}
