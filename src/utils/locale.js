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
      if (!polyglot || polyglot && polyglot.locale() !== code) {
        polyglot = new Polyglot({locale: code});
      }

      if (!polyglot.has(`${rootKey}.__root`)) {
          console.log(`GETTING: ${code} FOR: ${path}`)
          return import(`${__dirname}/../${path}/${code}.json`).then(locale => {
            console.log(`GOT THE THING FOR ${path}`)
              polyglot.extend(locale);
              cb && cb({locale, localeCode: code});
              return !!locale;
          });
      } else {
          return Promise.resolve(false)
      }
}
