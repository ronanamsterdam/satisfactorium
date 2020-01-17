import React from "react"
import Layout from "components/layout"
import SEO from "components/seo"

import { useLocale } from 'src/utils/hooks';
import { localize } from 'src/utils/locale';

import Vl, {VIEW_TYPES} from 'components/shared/loaders/view';

export default function () {

  const {isLocaleUpdating} = useLocale(__dirname)

  return <Layout>
    <SEO localeKey="about"/>
    {
      isLocaleUpdating ?
        <Vl type={VIEW_TYPES.BIG} />
        :
        <>
            <h3>{localize('about.heading')}</h3>
            <h5>{localize('about.subHeading')}</h5>
            <p>{localize('about.main1')}<br/>{localize('about.main2')}</p>
            <h4>{localize('about.thanks')}</h4>
        </>
    }
</Layout>
}