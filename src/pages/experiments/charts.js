import React from "react";

import SEO from "components/seo"
import ChartsApp from "apps/exp-charts/src/App";

const localeKey = "chartsApp";

const ChartsPage = () => {
  return (
    <>
      <SEO localeKey={localeKey}/>
      <ChartsApp />
    </>
  )
}

export default ChartsPage
