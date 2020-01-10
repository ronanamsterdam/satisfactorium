import React from "react"
import { Link } from "gatsby"

import Layout from "components/layout"
import SEO from "components/seo"

import style from './style.module.less'

export default () => (
  <Layout>
    <SEO title="Home" />
    <div className={style.container}>
      <h3>
        A set of experimental apps and components I've been iterating over from time to time
      </h3>
      <ul>
        <li>
          <Link tabIndex="11" to="/experiments/squares-game">Squares Game ▢ ⇢ ◯ (a game written in React) </Link>
        </li>
        <li>
          <Link tabIndex="11" to="/experiments/squares">React performance test </Link>
        </li>
      </ul>
    </div>
  </Layout>
)