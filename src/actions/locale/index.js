
import actionTypes from 'statics/actions';

const setLocale = idx => ({type:  actionTypes.LOCALE_SET_LOCALE, idx});
const updateLocales = _ => ({type: actionTypes.LOCALE_UPDATE_LOCALE});
const setLocales = locales => ({type:  actionTypes.LOCALE_SET_COLLECTION, locales});
const setLocaleIsUpdating = updating => ({type: actionTypes.LOCALE_SET_IS_UPDATING, updating});

export default {
    setLocale,
    setLocales,
    setLocaleIsUpdating,
    updateLocales,
};