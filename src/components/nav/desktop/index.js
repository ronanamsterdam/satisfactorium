import PropTypes from "prop-types"
import React from "react"
import { Link } from "gatsby"

import ThemeSwitch from 'components/shared/inputs/toggles/themeSwitch'

import helper from "../helper"
import style from "./style.module.less"

import {localize} from 'src/utils/locale';

const getBackButton = ({returnPath = "/", isRoot = true}) => {
  return !isRoot ?
    <Link aria-label="go back" title="go back" activeClassName={style.linkActive} tabIndex={1} to={"/"+returnPath}><span>⬇</span></Link>
    : <div aria-label="go back" title="go back" disabled className={style.linkNotActive}><span>⬇</span></div>
}

const Nav = ({ links = [], locale = {} }) => {
  const {returnPath, isRoot} = helper.getBackPath(window !== "undefined" && window.location.pathname)

  const localeCanTopBottom = !!locale.tb;

  return (
    <nav className={style.container}>
      <div className={style.content}>
        { !!links.length && <ul>
          {<li className={style.backLink}>{getBackButton({returnPath, isRoot})}</li>}
          {
            links.map(({text, href}, idx) =>
              <li key={idx} className={localeCanTopBottom ? style.canTb : ''}>
                <Link partiallyActive={true} activeClassName={style.linkActive} tabIndex={idx+1} to={href}><span>{localize(`nav.${text}`)}</span></Link>
              </li>)
          }
          </ul>
        }
        <div className={style.settings}>
          <ThemeSwitch />
        </div>
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