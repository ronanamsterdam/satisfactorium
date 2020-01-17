
import {useEffect, useState, lazy}  from 'react';
import { useSelector }              from 'react-redux';

import {DEVICE_FORM_FACTORS}    from 'statics/strings/reducers/ux';
import {updateLocale}           from 'src/utils/locale';

export const useLocale = (
  fullPath = 'src/',
  rootKey = '',
) => {
  const relativePath = fullPath.replace(/(.+\/){0,}src\//,'')
  if (!rootKey) {
    const rootKeyMatch = relativePath.match(/(?!\/)([A-Za-z-]+)/g);

    if (!rootKeyMatch) {
      throw Error(`no component locale rootKey found in ${fullPath}`)
    }

    rootKey = rootKeyMatch.pop();
  }

  const selectedLocale = useSelector(store => store.root.ux.locale.selected);
  const [updatingLocale, setUpdatingLocale] = useState(false);
  useEffect(() => {
    setUpdatingLocale(true);
    updateLocale({
      rootKey,
      code:       selectedLocale.code,
      path:       `${relativePath}/l18n`,
      cb:         () => setUpdatingLocale(false),
    })
  }, [selectedLocale]);

  return {locale: selectedLocale, isLocaleUpdating: updatingLocale};
}

export const useView = function (fullPath = 'src/') {
  const relativePath = fullPath.replace(/^src\//,'')
  const {factor} = useSelector(state => state.root.ux.device);
  const isMobile = factor === DEVICE_FORM_FACTORS.MOBILE || factor === DEVICE_FORM_FACTORS.TABLET
  return {
    View: lazy(() => isMobile ? import(`src/${relativePath}/mobile`) : import(`src/${relativePath}/desktop`)),
    isMobile
  }
}
