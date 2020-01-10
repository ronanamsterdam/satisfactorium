import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

const SecondPage = () => (
  <Layout>
    <SEO title="About me" />
    <h3>My name is Roman and I'm a web-engineer.</h3>
    <p>
      Rather than being a portfolio-like site this web app is more dedicated to experiments and best practices I'm using in my work. <br/>
      If you'd like to know more about me personally a linkedIn page or my github would give you much better perspectives.
    </p>
    <h4>And I do appreciate you checking my web here. Thanks <span role="img" aria-label="smart-face-emoji">🤓</span></h4>
  </Layout>
)

export default SecondPage
