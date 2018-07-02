const applyElement = require('./apply-element');

module.exports = function(text, word, url, opts) {
  const element = document.createElement('div');
  element.innerHTML = text;

  const newElement = applyElement(element, word, url, opts);

  // The processed text will be wrapped into <SPAN>. 
  // Return firstChild to keep it plaintext.
  return newElement.firstChild.nodeName === '#text'
    ? newElement.innerHTML
    : newElement.firstChild.innerHTML;
};

