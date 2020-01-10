import PropTypes from "prop-types"
import React from "react"
import { Link } from "gatsby"

import helper from "../helper"
import style from "./style.module.less"

const getBackButton = ({returnPath = "/", isRoot = true}) => {
  return !isRoot && <Link aria-label="go back" title="go back" activeClassName={style.linkActive} tabIndex={1} to={"/"+returnPath}><span>⬅</span></Link>
}

const Nav = ({ links = [] }) => {
  const {returnPath, isRoot} = helper.getBackPath(window !== "undefined" && window.location.pathname)

  return (
    <nav className={style.container}>
        { !!links.length && <ul>
          {<li className={style.backLink}>{getBackButton({returnPath, isRoot})}</li>}
          {
            links.map(({text, href}, idx) =>
              <li key={idx}>
                <Link partiallyActive={true} activeClassName={style.linkActive} tabIndex={idx+1} to={href}>{text}</Link>
              </li>)
          }
          </ul>
        }
    </nav>
  )
}

Nav.propTypes = {
  links: PropTypes.array,
}

Nav.defaultProps = {
  links: ``,
}

export default Nav