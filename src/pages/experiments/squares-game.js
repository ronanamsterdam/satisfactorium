import React from "react";
import Layout from "components/layout"
import SEO from "components/seo"

import SquaresGame from "components/squares-game"

const localeKey = "squaresGame";

const SecondPage = () => {
  return (
    <Layout>
      <SEO localeKey={localeKey}/>
      <SquaresGame />
    </Layout>
  )
}

export default SecondPage
