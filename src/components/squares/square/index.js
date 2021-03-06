import React, { useState } from "react";
import { useSelector }  from "react-redux";
import style            from "./style.module.less";

import {device}    from 'common/statics';

export default function() {
  const [hovered, setHovered] = useState(false);
  const {factor} = useSelector(state => state.root.ux.device);

  const handleHover = (e) => {
    e.preventDefault()
    setHovered(!hovered)
  };

  const onMouseOver = (e) => {
    if (factor === device.DEVICE_FORM_FACTORS.DESKTOP) {
      handleHover(e)
    }
  };
  /* eslint-disable */
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