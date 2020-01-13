/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"

import Device   from 'components/global/device';
import Theme   from 'components/global/theme';

import Nav      from "components/nav"
import Footer   from 'components/footer';

import style from "./style.module.less"

import 'style/index.less';

const Layout = ({ children }) => {
  return (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
            nav {
              text
              href
            }
          }
        }
      }
    `}
    render={data => (
      <div className={style.container}>
        <Nav links={data.site.siteMetadata.nav || []}/>
        <div className={style.content}>
          <main>{children}</main>
          <Footer />
        </div>
        <Device/>
        <Theme/>
      </div>
    )}
  />
)}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
