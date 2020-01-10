import React, { useState } from "react";
import { useSelector } from "react-redux";
import style            from "./style.module.less";

import {DEVICE_FORM_FACTORS}    from 'statics/strings/reducers/ux';

export default function({
  title,
}) {
  const [hovered, setHovered] = useState(false);
  const {factor} = useSelector(state => state.root.ux.device);

  const handleHover = (e) => {
    e.preventDefault();
    setHovered(!hovered);
  };

  const onMouseOver = (e) => {
    if (factor !== DEVICE_FORM_FACTORS.MOBILE && factor !== DEVICE_FORM_FACTORS.TABLET) {
      handleHover(e)
    }
  };

  return (
      <div className={style.container}>
          <div
              className={[
                  style.content,
                  ].join(' ')}
          >
              <button
                  className={[
                      hovered && style.hovered
                  ].join(' ')}
                  onMouseOver = {onMouseOver}
                  onClick = {handleHover}
              />
          </div>
      </div>
  )
}