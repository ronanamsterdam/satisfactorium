import React from "react";
import { Link } from "gatsby";

import { useLocale } from 'src/utils/hooks';
import { localize } from 'src/utils/locale';

import Layout from "components/layout"
import SEO from "components/seo"

import Vl, {VIEW_TYPES} from 'components/shared/loaders/view';

import style from './style.module.less'

export default () => {

  const {isLocaleUpdating} = useLocale(__dirname)

  return <Layout>
    <SEO localeKey="experiments" />
    {
      isLocaleUpdating ?
        <Vl type={VIEW_TYPES.BIG}/>
        :
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
    }
  </Layout>
}