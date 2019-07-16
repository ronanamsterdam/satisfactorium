import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
// import Image from "../components/image"
import SEO from "../components/seo"

import Squares from "../components/squares"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <Squares />
    <Link to="/squares-game">Go try Squares Game </Link>
  </Layout>
)

export default IndexPage
