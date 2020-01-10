const getBackPath = (pathname = '/') => {
    const m = pathname.match(/(?!\/)([A-Za-z-%#?=]+)/g);

    let returnPath = "/";
    let isRoot = true;

    if (m && m.length) {
      const [_, ...restMatch] = m.reverse();
      returnPath = m.length > 1 ? restMatch.reverse().join("/") : "/";

      isRoot = m.length === 1
    }

    return {returnPath, isRoot}
}



export default {
  getBackPath
}
