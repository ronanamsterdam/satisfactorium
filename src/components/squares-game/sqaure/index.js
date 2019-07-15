import React, { useState } from "react";
import style            from "./style.module.less";

import { Link } from "gatsby"

// import Image                from 'components/shared/images/image';
// import EnhanceOverlay       from 'components/shared/images/enhanceOverlay'
import {RESULTS_VIEW_MODES} from 'statics/strings/components/home/searchList';

export default function({
  disabled = false,
  url = "/",
  viewMode = RESULTS_VIEW_MODES.LIST,
  isActive,
  isBomb,
  idx,
  onExplode = (idx) => {
    console.log(`${idx} BOOOM!!`);
  },
  onActivate = () => {
    console.log(`${idx} onActivate!!`);
  },
  onDeactivate = () => {
    console.log(`${idx} onDeactivate!!`);
  }
}) {

  const [hovered, setHovered] = useState(false);
  const [willExplode, setWillExplode] = useState(isBomb);

  if (isActive && !isBomb) {
    setTimeout(()=>setHovered(true), Math.random()*1500);
  }

  if (hovered && willExplode) {
    setTimeout(()=> {
      setHovered(false);
      setWillExplode(false);
      onExplode(idx);
      // TODO: do disarmed state
      // setTimeout(()=>setHovered(true), 300);
    }, 800)
  }

  const handleHover = (e) => {
    e.preventDefault();
    if(!disabled) {
      setHovered(!hovered);
      if (!hovered) {
        onActivate(idx);
      } else {
        onDeactivate(idx);
      }
      setWillExplode(!!Math.round(Math.random()));
    }
  };

  if (viewMode === RESULTS_VIEW_MODES.LIST) {
      // gridClassMod = 'col-sm-11 col-md-11 col-lg-11';
  } else {
      // gridClassMod = isMapVisible ? 'col-sm-6 col-md-6 col-lg-6' : 'col-sm-6 col-md-4 col-lg-3';
  }
  return (
      <div
          className={[
              style.container,
              viewMode === RESULTS_VIEW_MODES.LIST ?
                style.listView : style.cardView,
          ].join(' ')}
      >
          <div
              className={[
                  style.content,
                  ].join(' ')}
          >
              <Link
                  to={url}
                  className={[
                      viewMode === RESULTS_VIEW_MODES.LIST ?
                      style.listView : style.cardView,
                      hovered && style.hovered,
                      hovered && willExplode && style.bomb,
                  ].join(' ')}
                  onMouseOver = {handleHover}
                  onClick = {handleHover}
              >
              </Link>
          </div>
      </div>
  )
}