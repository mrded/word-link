const _uniq = require('./uniq');
const _createLink = require('./create-link'); 

const replaceMany = function(text, words, url, attributes) {
  for (let i in words) {
    const foundRegexp = new RegExp(`\\b${words[i]}\\b`, 'g');
    const link = _createLink(words[i], url, attributes);

    text = text.replace(foundRegexp, link);
  }

  return text;
};

/**
 * Replace text inside an element.
 *
 * @param {object} element - The element.
 * @param {string} word - The text to be replaced.
 * @param {string} url - The url of a link.
 * @param {object} opts - Options.
 *
 * @returns {object} An Element with word-links.
 */
module.exports = function(element, word, url, opts) {
  opts = opts || {};

  //@TODO: Generate pattern based on opts.
  const findRegexp = new RegExp(`\\b${word}\\b`, 'ig');
  let found = element.data.match(findRegexp);

  if (found) {
    found = _uniq(found);

    if (opts.debug) {
      console.info(':: Wordlink', found, url);
    }

    const newElement = document.createElement('span');

    newElement.innerHTML = replaceMany(element.data, found, url, opts.attributes);

    element.parentNode.replaceChild(newElement, element);
  }

  return element;
};
