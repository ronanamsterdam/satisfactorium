import React from "react"
// import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

import Squares from "../components/squares"

const SecondPage = () => (
  <Layout>
    <SEO title="Page two" />

    <Squares />

    {/* <Link to="/">Go back to the homepage</Link> */}
  </Layout>
)

export default SecondPage
