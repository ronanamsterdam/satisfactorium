
export interface ActionBase {
  type: String
}

export interface ActionSetDeviceFormFactor extends ActionBase {
  factor: String,
}

export interface ActionSetDeviceUserAgent extends ActionBase{
  agent: String,
}

export interface Dimensions {
  height:       Number,
  width:        Number,
  outerHeight:  Number,
  outerWidth:   Number
}

export interface ActionSetDeviceDimensions extends ActionBase {
  dimensions: Dimensions,
}

export interface ActionSetTheme extends ActionBase {
  theme: String
}

export interface ActionAppInit extends ActionBase {}