import React from "react";
import posed from 'react-pose';
import { Link } from "gatsby";

import { useLocale } from 'src/utils/hooks';
import { localize } from 'src/utils/locale';

import Layout from "components/layout"
import SEO from "components/seo"

import Vl, {VIEW_TYPES} from 'components/shared/loaders/view';

import style from './style.module.less'

const LoadedView = posed.div({
  enter: { opacity: 1,  y: 0, transition: { duration: 700 } },
  exit: { opacity: 0, y: -30, transition: { duration: 700 } },
})

export default () => {

  const {isLocaleUpdating} = useLocale(__dirname)

  return <Layout loading={isLocaleUpdating}>
    <SEO localeKey="experiments" />
        <Vl loading={isLocaleUpdating} type={VIEW_TYPES.BIG}>
          <LoadedView
            pose="enter"
            initialPose="exit"
            className={style.container}
          >
            <h3>{localize('experiments.text1')}</h3>
            <ul>
              <li>
                <Link tabIndex="11" to="/experiments/squares-game">{localize('experiments.item1')}</Link>
              </li>
              <li>
                <Link tabIndex="11" to="/experiments/squares">{localize('experiments.item2')}</Link>
              </li>
            </ul>
          </LoadedView>
        </Vl>
  </Layout>
}