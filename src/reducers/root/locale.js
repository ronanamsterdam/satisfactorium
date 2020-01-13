import actionTypes         from 'statics/actions';

import * as supportedLocaleTypes from 'statics/strings/reducers/ux/supportedLocales';

export const localeInitialState = {
    collection:[
        {
            name:       supportedLocaleTypes.LOCALE_TYPE_ENG,
            code:       'en-us',
            lang:       'en',
            selected:   true,
        },
        {
            name:       supportedLocaleTypes.LOCALE_TYPE_JP,
            code:       'ja',
            lang:       'ja',
            selected:   false,
        },
    ],
    updating: false,
    selected: {
        name:       supportedLocaleTypes.LOCALE_TYPE_ENG,
        code:       'en-us',
        lang:       'en',
        selected:   true,
    },
};


export default function user(state = localeInitialState, action) {
    switch (action.type) {
        case actionTypes.LOCALE_SET_LOCALE:
            var newLocalesState = state.collection.map((item, idx) => {item.selected = idx === action.idx; return item})
            const selected = newLocalesState[action.idx];
            return {
                ...state,
                collection: newLocalesState,
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