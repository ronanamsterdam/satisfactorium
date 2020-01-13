import React from "react"
// import { Link } from "gatsby"

import Layout from "components/layout"
import SEO from "components/seo"

import Squares from "components/squares"

const localeKey = "squares";

const SecondPage = () => (
  <Layout>
    <SEO localeKey={localeKey} />
    <Squares />
  </Layout>
)

export default SecondPage
