import React, { useState } from "react";
import style            from "./style.module.less";

import { Link } from "gatsby"

export default function({
  title,
  url = "/",
}) {
  const [hovered, setHovered] = useState(false);

  const handleHover = (e) => {
    e.preventDefault();
    setHovered(!hovered);
  };

  return (
      <div
          className={style.container}
      >
          <div
              className={[
                  style.content,
                  ].join(' ')}
          >
              <Link
                  to={url}
                  className={[
                      hovered && style.hovered
                  ].join(' ')}
                  onMouseOver = {handleHover}
                  onClick = {handleHover}
              >
                  <div
                    className={style.cardContent}
                  >
                      <div
                          className={style.infoContainer}
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