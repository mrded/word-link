const applyElement = require('./apply-element');

module.exports = function(text, word, url, opts) {
  const element = document.createElement('div');
  element.innerHTML = text;

  applyElement(element, word, url, opts);

  // The processed text will be wrapped into <SPAN>. 
  // Return firstChild to keep it plaintext.
  return element.firstChild.nodeName === '#text'
    ? element.innerHTML
    : element.firstChild.innerHTML;
};

