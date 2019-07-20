import React from "react"
// import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

import Squares from "../components/squares"

const SecondPage = () => (
  <Layout>
    <SEO title="Squares item" />
    <Squares />
  </Layout>
)

export default SecondPage
