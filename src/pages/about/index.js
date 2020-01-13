import React, {useEffect, useState}  from "react"
import {useSelector}  from "react-redux"
import Layout from "components/layout"
import SEO from "components/seo"

import {localize, updateLocale} from 'src/utils/locale';

export default function () {

  const selectedLocale = useSelector(store => store.root.ux.locale.selected);
  const [updatingLocale, setUpdatingLocale] = useState(false);

  useEffect(() => {
    setUpdatingLocale(true);
    updateLocale({
      rootKey:    'about',
      code:   selectedLocale.code,
      path:       'pages/about/l18n',
      cb:         () => {setUpdatingLocale(false)},
    })
  }, [selectedLocale]);

  return <Layout>
    <SEO title="About me" />
    <h3>{localize('about.title')}</h3>
    <h5>{localize('about.subTitle')}</h5>
    <p>{localize('about.main1')}<br/>{localize('about.main2')}</p>
    <h4>{localize('about.thanks')}</h4>
</Layout>
}