
import React from 'react';
import Layout from 'components/layout';

import Device   from 'components/global/device';
import Theme   from 'components/global/theme';

import Nav      from "components/nav"
import Footer   from 'components/footer';

import style from './style.module.less';

export default ({ element, props }) => {
  // props provide same data to Layout as Page element will get
  // including location, data, etc - you don't need to pass it
  return <div className={style.root}>
    <Nav/>
    <div className={style.rootContent}>
      <Layout {...props}>{element}</Layout>
      <Footer />
    </div>
    <Device />
    <Theme />
  </div>
}