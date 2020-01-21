import * as actionNames   from 'statics/actions'

import {ActionSetLocale} from './locale/types'

export interface ActionSetDeviceFormFactor {
  type: typeof actionNames.DEVICE_FORM_FACTOR_SET,
  factor: String,
}

export interface ActionSetDeviceUserAgent {
  type: typeof actionNames.DEVICE_USER_AGENT_SET,
  agent: String,
}

export interface Dimensions {
  height:       Number,
  width:        Number,
  outerHeight:  Number,
  outerWidth:   Number
}

export interface ActionSetDeviceDimensions {
  type: typeof actionNames.DEVICE_DIMENSIONS_SET,
  dimensions: Dimensions,
}

export interface ActionSetTheme {
  type: typeof actionNames.SET_THEME,
  theme: String
}

export interface ActionAppInit {}

export type UxTypes =
  ActionSetDeviceUserAgent |
  ActionSetDeviceDimensions |
  ActionSetDeviceFormFactor |
  ActionSetTheme |
  ActionSetLocale