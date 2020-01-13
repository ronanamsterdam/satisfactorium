import Polyglot from 'node-polyglot';

const polyglot = new Polyglot();

export const localize = function (stringPath, variables = {}) {
    if (polyglot && polyglot.phrases[stringPath]) {
        return polyglot.t(stringPath, variables);
    } else {
        return null;
    }
}

export const extendLocale = function(locale) {
    locale && polyglot.extend(locale);
}

export const updateLocale = function ({
        selected = "en-us",
        path,
        cb
    }) {
      console.log(`GETTING: ${selected} FOR: ${path}`)
    // if (selected !== current) {
        return import(`${__dirname}/../${path}/${selected}.json`).then(locale => {
            polyglot.extend(locale);
            cb && cb({locale, localeCode: selected});

            return !!locale;
        });
    // } else {
    //     return Promise.resolve(false)
    // }
}
