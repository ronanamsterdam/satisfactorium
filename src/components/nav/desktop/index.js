import PropTypes from "prop-types"
import React, {useEffect} from "react"
import { useDispatch, useSelector } from "react-redux";
import { Link } from "gatsby"

import {THEMES}    from 'statics/strings/reducers/ux';
import actions from "src/actions";

import helper from "../helper"
import style from "./style.module.less"

const getBackButton = ({returnPath = "/", isRoot = true}) => {
  return !isRoot ?
    <Link aria-label="go back" title="go back" activeClassName={style.linkActive} tabIndex={1} to={"/"+returnPath}><span>⬇</span></Link>
    : <div aria-label="go back" title="go back" disabled className={style.linkNotActive}><span>⬇</span></div>
}

const Nav = ({ links = [] }) => {
  const {returnPath, isRoot} = helper.getBackPath(window !== "undefined" && window.location.pathname)
  const theme = useSelector(state => state.root.ux.theme)
  const dispatch = useDispatch();

  useEffect(()=> {
    if (theme === THEMES.DARK) {
      document.body.classList.add("night");
    } else {
      document.body.classList.remove("night");
    }
  }, [theme])

  const onToggleTheme = (e) => {
    const {checked} = e.target;
    if (checked) {
      dispatch(actions.setTheme(THEMES.DARK))
    } else {
      dispatch(actions.setTheme(THEMES.LIGHT))
    }
  }

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
        <div className={style.settings}>
          <div className={style.themeSwitch}>
            <input id="dark-light-switch" checked={theme === THEMES.DARK} onChange={onToggleTheme} type="checkbox"/>
            <label htmlFor="dark-light-switch" ><span></span></label>
          </div>
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