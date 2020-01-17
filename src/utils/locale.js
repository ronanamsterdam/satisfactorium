import Polyglot from 'node-polyglot';

let polyglot = new Polyglot({locale: "en-us"});

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
        rootKey = "",
        code = "en-us",
        path,
        cb
    }) {
      if (!polyglot || (polyglot && polyglot.locale() !== code)) {
        polyglot = new Polyglot({locale: code});
      }

      if (!polyglot.has(`${rootKey}.__root`)) {
          return import(`../${path}/${code}.json`).then(locale => {
              polyglot.extend(locale);
              cb && cb({locale, localeCode: code});
              return !!locale;
          });
      } else {
          return Promise.resolve().then(() => cb && cb({}))
      }
}
