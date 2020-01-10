import PropTypes from "prop-types"
import React from "react"
import { Link } from "gatsby"

import helper from "./helper"
import style from "./style.module.less"

const getBackButton = ({returnPath = "/", isRoot = true}) => {
  return !isRoot ?
    <Link aria-label="go back" title="go back" activeClassName={style.linkActive} tabIndex={1} to={"/"+returnPath}><span>⬅</span></Link>
    : <a aria-label="go back" title="go back" href="/" disabled className={style.linkNotActive} tabIndex={-1}><span>⬅</span></a>
}

const Nav = ({ links = [] }) => {
  const {returnPath, isRoot} = helper.getBackPath(window !== "undefined" && window.location.pathname)

  return (
    <nav className={style.container}>
      <div className={style.content}>
        { !!links.length && <ul>
          {<li className={style.backLink}>{getBackButton({returnPath, isRoot})}</li>}
          {
            links.map(({text, href}, idx) =>
              <li key={idx}>
                <Link partiallyActive={true} activeClassName={style.linkActive} tabIndex={idx+1} to={href}><span>{text}</span></Link>
              </li>)
          }
          </ul>
        }
      </div>
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