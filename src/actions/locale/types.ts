import * as actionNames  from 'statics/actions';

export interface ActionSetLocale {
  type: typeof actionNames.LOCALE_SET_LOCALE
  idx: number
}