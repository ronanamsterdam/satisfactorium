import React, {useEffect} from "react";
import { useDispatch } from "react-redux";
import { Link } from "gatsby";

import Layout from "../components/layout"
import SEO from "../components/seo"

import SquaresGame from "../components/squares-game"

import actions from "../actions";

const SecondPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.squareGameReset())
  })

  return (
    <Layout>
    <SEO title="Squares Game" />
    <SquaresGame />
    <Link to="/"> Back Home </Link>
  </Layout>
  )
}

export default SecondPage
