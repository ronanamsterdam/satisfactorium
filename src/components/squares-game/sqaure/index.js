import React, { useState } from "react";
import style            from "./style.module.less";

import { Link } from "gatsby"

// import Image                from 'components/shared/images/image';
// import EnhanceOverlay       from 'components/shared/images/enhanceOverlay'
import {RESULTS_VIEW_MODES} from 'statics/strings/components/home/searchList';

export default function({
  title,
  url = "/",
  viewMode = RESULTS_VIEW_MODES.LIST,
}) {
  const [hovered, setHovered] = useState(false);

  const handleHover = (e) => {
    e.preventDefault();
    setHovered(!hovered);
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
                      hovered && style.hovered
                  ].join(' ')}
                  onMouseOver = {handleHover}
                  onClick = {handleHover}
              >
                  <div
                      className={[
                          style.cardContent,
                          viewMode === RESULTS_VIEW_MODES.LIST ?
                            style.cardContentListView : ''
                      ].join(' ')}
                  >
                      <div
                          className={[
                              style.infoContainer,
                              viewMode === RESULTS_VIEW_MODES.LIST ?
                                style.listView : style.cardView
                          ].join(' ')}
                      >
                          {
                              title ?
                              <div
                                  className={style.title}
                              >
                                  {title}
                              </div> : null
                          }
                      </div>
                  </div>
              </Link>
          </div>
      </div>
  )
}