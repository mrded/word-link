const _uniq = require('./uniq');
const _createLink = require('./create-link'); 

module.exports = function(element, word, url, opts) {
  opts = opts || {};

  //@TODO: Generate pattern based on opts.
  const pattern = "\\b:text\\b";

  const findRegexp = new RegExp(pattern.replace(':text', word), 'ig');
  let found = element.data.match(findRegexp);

  if (found) {
    found = _uniq(found);

    if (opts.debug) {
      console.info(':: Wordlink', found, url);
    }

    const newElement = document.createElement('span');

    for (let j in found) {
      const foundRegexp = new RegExp(pattern.replace(':text', found[j]), 'g');
      element.data = element.data.replace(foundRegexp, _createLink(found[j], url, opts.attributes));
    }

    newElement.innerHTML = element.data;

    element.parentNode.replaceChild(newElement, element);
  }
};
