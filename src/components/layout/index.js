/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"

import Nav      from "components/nav"
import Device   from 'components/global/device';

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
          <footer>
            © {new Date().getFullYear()}, Check out whole project on my
            {` `}
            <a href="https://github.com/ronanamsterdam/satisfactorium" target="_blank" rel="noopener noreferrer">Github</a> or read <a href="https://www.linkedin.com/in/romanzhyliov">About Me</a>
          </footer>
        </div>
        <Device/>
      </div>
    )}
  />
)}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
