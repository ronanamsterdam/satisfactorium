import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

import SquaresGame from "../components/squares-game"

const SecondPage = () => (
  <Layout>
    <SEO title="Squares Game" />
    <SquaresGame />
    <Link to="/"> Back Home </Link>
  </Layout>
)

export default SecondPage
