import * as actionNames  from 'statics/actions';
import {UxTypes}  from 'actions/types';

import * as supportedLocaleTypes  from 'common/statics/locale';

export const localeInitialState = {
    collection:[
        {
            name:       supportedLocaleTypes.LOCALE_TYPE_ENG,
            code:       'en-us',
            lang:       'en',
            loaded:     'false',
            tb:         false,
        },
        {
            name:       supportedLocaleTypes.LOCALE_TYPE_JP,
            code:       'ja',
            lang:       'ja',
            loaded:     'false',
            tb:         true,
        },
    ],
    updating: false,
    selected: {
        name:       supportedLocaleTypes.LOCALE_TYPE_ENG,
        code:       'en-us',
        lang:       'en',
        loaded:     'false',
        tb:         false,
    },
};


export default function locale(state = localeInitialState, action: UxTypes) {
    switch (action.type) {
        case actionNames.LOCALE_SET_LOCALE:
          const selected = state.collection[action.idx];
          return {
              ...state,
              selected,
          }

        default:
          return state;
    }
}