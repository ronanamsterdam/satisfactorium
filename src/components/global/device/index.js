// non ui component to gather and react to client device's specifics
import  { useEffect } from 'react';

import { useDispatch } from "react-redux";
import actions from 'src/actions';
import {DEVICE_FORM_FACTORS}    from 'statics/strings/reducers/ux';

const debounce = require('src/utils').debounceCl();
const coreStyleVars = require("!less-vars-loader?camelCase!src/common/style/variables.less");

export default function() {

    const dispatch = useDispatch();

    useEffect(() => {
      __setAgent({dispatch});
      __setDimensions({dispatch});
      __setListeners();
      return () => __removeListeners();
    })

    const __setListeners = () => window.addEventListener('resize', onResize)
    const __removeListeners = () => window.removeEventListener('resize', onResize);

    const onResize = (e) => debounce(() => __onResize({dispatch, e}), 300);
    const __onResize = ({dispatch,e}) => __setDimensions({dispatch, e});

    const __setAgent = ({dispatch}) => {
      const agent = navigator.userAgent;
      dispatch(actions.setDeviceUserAgent(agent));
    }

    const __setDimensions = ({dispatch}) => {
      const {innerHeight, innerWidth, outerWidth, outerHeight} = window;

      const tabletBreak = parseInt(coreStyleVars.tabletBreak);
      const mobileBreak = parseInt(coreStyleVars.mobileBreak);

      let factor = DEVICE_FORM_FACTORS.DESKTOP

      if (innerWidth <= mobileBreak) {
          factor = DEVICE_FORM_FACTORS.MOBILE;
      } else if (innerWidth <= tabletBreak) {
          factor = DEVICE_FORM_FACTORS.TABLET;
      }

      dispatch(actions.setDeviceFormFactor(factor));

      dispatch(actions.setDeviceDimensions({
          height:         innerHeight,
          width:          innerWidth,
          outerHeight,
          outerWidth,
      }));
    }

    return null;
}