import PropTypes from "prop-types"
import React from "react"
import { Link } from "gatsby"

import ThemeSwitch from 'components/shared/inputs/toggles/themeSwitch'

import helper from "../helper"
import style from "./style.module.less"

import {localize} from 'common/utils/locale'

import Vl from 'common/components/loaders/view';

const getBackButton = ({returnPath = "/", isRoot = true, tabIdx = 1}) => {
  return !isRoot ?
    <Link aria-label="go back" title="go back" activeClassName={style.linkActive} tabIndex={tabIdx} to={"/"+returnPath}><span>⬇</span></Link>
    : <div aria-label="go back" title="go back" disabled className={style.linkNotActive}><span>⬇</span></div>
}

const Nav = ({ links = [], locale = {}, isLocaleUpdating = false}) => {
  const {returnPath, isRoot} = helper.getBackPath(window !== "undefined" && window.location.pathname)

  const localeCanTopBottom = !!locale.tb;

  return (
    <nav className={style.container}>
      <div className={style.content}>
        { !!links.length && <ul>
          {
            links.map(({text, href}, idx) =>
              <li key={idx} className={localeCanTopBottom ? style.canTb : ''}>
                  <Vl loading={isLocaleUpdating}>
                    <Link
                      partiallyActive={true}
                      activeClassName={style.linkActive}
                      tabIndex={idx+1} to={href}>
                        <span>{localize(`nav.${text}`)}</span>
                    </Link>
                  </Vl>
              </li>)
          }
          {<li className={style.backLink}>{getBackButton({returnPath, isRoot, tabIdx: links.length})}</li>}
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