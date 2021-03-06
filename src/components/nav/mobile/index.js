import PropTypes from "prop-types"
import React from "react"
import { Link } from "gatsby"

import {localize} from 'common/utils/locale';

import Vl from 'common/components/loaders/view';

import helper from "../helper"
import style from "./style.module.less"

const getBackButton = ({returnPath = "/", isRoot = true}) => {
  // eslint-disable-next-line
  return !isRoot && <Link aria-label="go back" title="go back" activeClassName={style.linkActive} tabIndex={1} to={"/"+returnPath}><span>◀︎</span></Link>
}

const Nav = ({ links = [], isLocaleUpdating = false }) => {
  const {returnPath, isRoot} = helper.getBackPath(window !== "undefined" && window.location.pathname)

  const navItems = links.map(({text, href}, idx) =>
  <li key={idx}>
    <Vl loading={isLocaleUpdating} >
      <Link
        partiallyActive={true}
        activeClassName={style.linkActive}
        // eslint-disable-next-line
        tabIndex={idx+1}
        to={href}>{localize(`nav.${text}`)}
      </Link>
    </Vl>
  </li>)

  return (
    <nav className={style.container}>
        { !!links.length && <ul className={!isRoot ? style.nonRootNavContainer : ''}>
          {<li className={style.backLink}>{getBackButton({returnPath, isRoot})}</li>}
          { isRoot ?
              navItems :
              <li>
                <ul className={style.nonRootNav}>
                  {navItems}
                </ul>
              </li>
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