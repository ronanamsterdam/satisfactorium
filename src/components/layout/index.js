/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"



import style from "./style.module.less"

import 'style/index.less';

const Layout = ({ children }) => {
  // TODO:
  const loading = false
  // const {isLocaleUpdating: loading} = useLocale(__dirname)
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
        <div className={style.content}>
          <main className={loading ? style.mainLoading : ''}>{children}</main>
        </div>
      </div>
    )}
  />
)}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
