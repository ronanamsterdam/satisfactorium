import React from "react";

import { useLocale } from 'common/utils/hooks';
import { localize } from 'common/utils/locale';

import SEO from "components/seo"
import LoadedView from 'components/shared/animated/div'
import ActionCard from 'components/shared/links/card'

import Vl, {VIEW_TYPES} from 'common/components/loaders/view';

import style from './style.module.less'

export default () => {

  const {isLocaleUpdating} = useLocale(__dirname)

  return <>
    <SEO localeKey="experiments" />
    <Vl loading={isLocaleUpdating} type={VIEW_TYPES.BIG}>
      <LoadedView className={style.container}>
        <h3>{localize('experiments.text1')}</h3>
        <ul>
          <li>
            <ActionCard
              subContent={localize('experiments.subItem1')}
              to="/experiments/squares-game">
              {localize('experiments.item1')}
            </ActionCard>
          </li>
          <li>
            <ActionCard
              subContent={localize('experiments.subItem2')}
              to="/experiments/squares">
              {localize('experiments.item2')}
            </ActionCard>
          </li>
          {/* TODO: */}
          {/* <li>
            <ActionCard
              subContent={localize('experiments.subItem3')}
              to="/experiments/charts">
              {localize('experiments.item3')}
            </ActionCard>
          </li> */}
          <li>
            <ActionCard
              subContent={localize('experiments.subItem4')}
              to="/experiments/twitter-giffer">
              {localize('experiments.item4')}
            </ActionCard>
          </li>
        </ul>
      </LoadedView>
    </Vl>
  </>
}