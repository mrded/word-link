const applyElement = require('./apply-element');

module.exports = function(text, word, url, opts) {
  const element = document.createElement('div');
  element.innerHTML = text;

  const newElement = applyElement(element, word, url, opts);

  return newElement.innerHTML;
};

