
import actionTypes from 'statics/actions';

const setLocale = idx => ({type:  actionTypes.LOCALE_SET_LOCALE, idx});
const setLocaleLoaded = localeCode => ({type: actionTypes.LOCALE_SET_LOADED, localeCode});

export default {
    setLocale,
    setLocaleLoaded,
};