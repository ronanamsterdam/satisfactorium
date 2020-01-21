
import * as actionNames from 'statics/actions';

import {ActionSetLocale} from './types'

const setLocale = (idx: number): ActionSetLocale => ({type:  actionNames.LOCALE_SET_LOCALE, idx});
const setLocaleLoaded = localeCode => ({type: actionNames.LOCALE_SET_LOADED, localeCode});

export default {
    setLocale,
    setLocaleLoaded,
};