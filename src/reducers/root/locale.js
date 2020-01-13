import actionTypes         from 'statics/actions';

import * as supportedLocaleTypes from 'statics/strings/reducers/ux';

export const localeInitialState = {
    collection:[
        {
            name:       supportedLocaleTypes.LOCALE_TYPE_ENG,
            code:       'en-us',
            lang:       'en',
            tb:         false,
        },
        {
            name:       supportedLocaleTypes.LOCALE_TYPE_JP,
            code:       'ja',
            lang:       'ja',
            tb:         true,
        },
    ],
    updating: false,
    selected: {
        name:       supportedLocaleTypes.LOCALE_TYPE_ENG,
        code:       'en-us',
        lang:       'en',
        tb:         false,
    },
};


export default function locale(state = localeInitialState, action) {
    switch (action.type) {
        case actionTypes.LOCALE_SET_LOCALE:
            const selected = state.collection[action.idx];
            return {
                ...state,
                selected,
            }
        case actionTypes.LOCALE_SET_IS_UPDATING:
            return {
                ...state,
                updating: action.updating
            }

        default:
            return state;
    }
}