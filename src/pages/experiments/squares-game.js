import React from "react";
import Layout from "components/layout"
import SEO from "components/seo"

import SquaresGame from "components/squares-game"

const SecondPage = () => {
  return (
    <Layout>
      <SEO title="Squares Game" />
      <SquaresGame />
    </Layout>
  )
}

export default SecondPage
