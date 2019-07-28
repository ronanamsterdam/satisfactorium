import React, {useEffect} from "react";
import { useDispatch } from "react-redux";
import { Link } from "gatsby";

import Layout from "../components/layout"
import SEO from "../components/seo"

import SquaresGame from "../components/squares-game"

import actions from "../actions";

const SecondPage = () => {
  return (
    <Layout>
      <SEO title="Squares Game" />
      <Link to="/"> ⬅ Back Home </Link>
      <SquaresGame />
    </Layout>
  )
}

export default SecondPage
