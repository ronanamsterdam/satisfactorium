import React from 'react'

import SEO from 'components/seo'
import LoadedView from 'components/shared/animated/div'

import { useLocale } from 'common/utils/hooks'
import { localize } from 'common/utils/locale'

import Vl, {VIEW_TYPES} from 'common/components/loaders/view'

export default function () {

  const {isLocaleUpdating} = useLocale(__dirname)

  return <>
    <SEO localeKey="about"/>
    <Vl loading={isLocaleUpdating} type={VIEW_TYPES.BIG} >
      <LoadedView>
        <h3>{localize('about.heading')}</h3>
        <h5>{localize('about.subHeading')}</h5>
        <p>{localize('about.main1')}<br/>{localize('about.main2')}</p>
        <h4>{localize('about.thanks')}</h4>
      </LoadedView>
    </Vl>
  </>
}