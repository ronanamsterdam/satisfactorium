import React from "react";

import SEO from "components/seo"
import SquaresGame from "components/squares-game"

const localeKey = "squaresGame";

const SecondPage = () => {
  return (
    <>
      <SEO localeKey={localeKey}/>
      <SquaresGame />
    </>
  )
}

export default SecondPage
