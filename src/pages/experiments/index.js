import React, {useEffect, useState}  from "react";
import {useSelector}  from "react-redux";
import { Link } from "gatsby";

import {localize, updateLocale} from 'src/utils/locale';

import Layout from "components/layout"
import SEO from "components/seo"

import style from './style.module.less'

const localeKey = 'experiments';

export default () => {

  const selectedLocale = useSelector(store => store.root.ux.locale.selected);
  // eslint-disable-next-line
  const [_, setUpdatingLocale] = useState(false);
  useEffect(() => {
    setUpdatingLocale(true);
    updateLocale({
      rootKey:    localeKey,
      code:       selectedLocale.code,
      path:       'pages/experiments/l18n',
      cb:         () => setUpdatingLocale(false),
    })
  }, [selectedLocale]);

  return <Layout>
    <SEO localeKey={localeKey} />
    <div className={style.container}>
      <h3>{localize('experiments.text1')}</h3>
      <ul>
        <li>
          <Link tabIndex="11" to="/experiments/squares-game">{localize('experiments.item1')}</Link>
        </li>
        <li>
          <Link tabIndex="11" to="/experiments/squares">{localize('experiments.item2')}</Link>
        </li>
      </ul>
    </div>
  </Layout>
}