
import  { useEffect } from 'react';
import { useSelector } from "react-redux";

import {THEMES}    from 'common/statics/theme';

export default function() {
  const theme = useSelector(state => state.root.ux.theme)

  useEffect(()=> {
    if (theme === THEMES.DARK) {
      document.body.classList.add("night");
    } else {
      document.body.classList.remove("night");
    }
  }, [theme])

  return null;
}