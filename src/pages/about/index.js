import React from 'react'
import posed from 'react-pose';

import Layout from 'components/layout'
import SEO from 'components/seo'

import { useLocale } from 'src/utils/hooks';
import { localize } from 'src/utils/locale';

import Vl, {VIEW_TYPES} from 'components/shared/loaders/view';

const LoadedView = posed.div({
  enter: { opacity: 1,  y: 0, transition: { duration: 700 } },
  exit: { opacity: 0, y: -30, transition: { duration: 700 } },
})

export default function () {

  const {isLocaleUpdating} = useLocale(__dirname)

  return <Layout loading={isLocaleUpdating} >
    <SEO localeKey="about"/>
    <Vl loading={isLocaleUpdating} type={VIEW_TYPES.BIG} >
      <LoadedView
          pose="enter"
          initialPose="exit"
      >
        <h3>{localize('about.heading')}</h3>
        <h5>{localize('about.subHeading')}</h5>
        <p>{localize('about.main1')}<br/>{localize('about.main2')}</p>
        <h4>{localize('about.thanks')}</h4>
      </LoadedView>
    </Vl>
</Layout>
}