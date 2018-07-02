const _replaceTextElement = require('./replace-text-element');

const _replaceTagElement = function(element, word, url, opts) {
  //@TODO: WTF?
  if (element.childNodes.length, element.childNodes) {
    for (let i in element.childNodes) {
      const node = element.childNodes[i];
      const tag = node.nodeName;

      if (tag === undefined) {
        // Ignore.
      }

      else if (tag === "#text") {
        _replaceTextElement(node, word, url, opts);
      }

      else if (opts.excludedTags.indexOf(tag) === -1) {
        _replaceTagElement(node, word, url, opts);
      }
    }
  }
};

module.exports = _replaceTagElement;
