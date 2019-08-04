/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"

import Header from "../header"
// import "./layout.css"

import 'style/index.less';

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <>
        <Header siteTitle={data.site.siteMetadata.title} />
        <div
          style={{
            margin: `0 auto`,
            // maxWidth: 960,
            padding: `0px 18px 23px`,
            paddingTop: 0,
          }}
        >
          <main>{children}</main>
          <footer>
            © {new Date().getFullYear()}, Check the whole project on my
            {` `}
            <a href="https://github.com/ronanamsterdam/satisfactorium" target="_blank" rel="noopener noreferrer">Github</a> or read <a href="https://www.linkedin.com/in/romanzhyliov">About Me</a>
          </footer>
        </div>
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
