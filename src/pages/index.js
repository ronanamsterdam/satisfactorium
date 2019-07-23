import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

import Squares from "../components/squares"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <Link to="/squares-game">Go try my Squares Game ▢ ⇢ ◯ </Link>
    <Squares />
  </Layout>
)

export default IndexPage
