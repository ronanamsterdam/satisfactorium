import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import style            from "./style.module.less";

import {DEVICE_FORM_FACTORS}    from 'statics/strings/reducers/ux';

export default function({
  disabled = false,
  id = "",
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
  const shouldBlastPresent = useSelector(state => state.squareGame.activeSquares.indexOf(idx) > -1 && state.squareGame.shouldBlast[idx]);
  const {factor} = useSelector(state => state.root.ux.device);
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

  if (hovered && (willExplode || shouldBlastPresent)) {
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

  const handleFocus = (e) => {
    if (factor === DEVICE_FORM_FACTORS.MOBILE || factor === DEVICE_FORM_FACTORS.TABLET) {
      handleHover(e)
    }
  }

  return (
      <div
          id={id}
          className={style.container}
      >
          <div
              className={[
                  style.content,
                  ].join(' ')}
          >
            <button
                className={[
                    hovered && style.hovered,
                    hovered && willExplode && style.bomb,
                ].join(' ')}
                onMouseOver = {handleHover}
                onClick = {handleHover}
                onFocus = {handleFocus}/>
          </div>
      </div>
  )
}