import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import style            from "./style.module.less";

import { Link } from "gatsby"

export default function({
  disabled = false,
  url = "/",
  isActive,
  isBomb,
  idx,
  probabilityFactor,
  getIsBomb = () => {},
  onExplode = () => {},
  onActivate = () => {},
  onDeactivate = () => {},
}) {

  // TODO: this is pretty implicit. Figure a better way
  const isLevelDone = useSelector(state => state.squareGame.totalSquares === state.squareGame.activeSquares.length);
  const isDisabled = disabled || isLevelDone;

  const [initialActive, setInitialActive] = useState(isActive && !isBomb);
  const [hovered, setHovered] = useState(false);
  const [willExplode, setWillExplode] = useState(isBomb);

  let initialActiveTm = null;
  let explodeTm = null;

  if (initialActive) {
    initialActiveTm = setTimeout(()=>{
      setInitialActive(false);
      setHovered(true);
      !isDisabled && onActivate(idx);
    }, Math.random()*1500);
  }

  if (hovered && willExplode) {
    explodeTm = setTimeout(()=> {
      setHovered(false);
      setWillExplode(false);
      onExplode(idx);
    }, 800)
  }

  const cleanTimeouts = () => {
    initialActiveTm && clearTimeout(initialActiveTm);
    explodeTm && clearTimeout(explodeTm);
  }

  useEffect(()=> cleanTimeouts);

  const handleHover = (e) => {
    e && e.preventDefault();
    if(!isDisabled) {
      cleanTimeouts();
      setHovered(!hovered);
      if (!hovered) {
        onActivate(idx);
      } else {
        onDeactivate(idx);
      }
      setWillExplode(getIsBomb(probabilityFactor));
    }
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
            {/* TODO: change to div or something */}
              <Link
                  to={url}
                  className={[
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