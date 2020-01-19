import React from "react"

import SEO from "components/seo"
import Squares from "components/squares"

const localeKey = "squares";

const SecondPage = () => (
  <>
    <SEO localeKey={localeKey} />
    <Squares />
  </>
)

export default SecondPage
