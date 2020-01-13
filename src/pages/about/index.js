import React, {useEffect, useState}  from "react"
import {useSelector}  from "react-redux"
import Layout from "components/layout"
import SEO from "components/seo"

import {localize, updateLocale} from 'src/utils/locale';

const localeKey = 'about'

export default function () {

  const selectedLocale = useSelector(store => store.root.ux.locale.selected);
  // eslint-disable-next-line
  const [_, setUpdatingLocale] = useState(false);
  useEffect(() => {
    setUpdatingLocale(true);
    updateLocale({
      rootKey:    localeKey,
      code:       selectedLocale.code,
      path:       'pages/about/l18n',
      cb:         () => {setUpdatingLocale(false)},
    })
  }, [selectedLocale]);

  return <Layout>
    <SEO localeKey={localeKey}/>
    <h3>{localize('about.heading')}</h3>
    <h5>{localize('about.subHeading')}</h5>
    <p>{localize('about.main1')}<br/>{localize('about.main2')}</p>
    <h4>{localize('about.thanks')}</h4>
</Layout>
}