const ReplaceOneElement = require('./replace-one-element');

const ReplaceManyElement = function(element, word, url, opts) {
  // No children? Return!
  if (!element.childNodes || element.childNodes.length <= 0) {
    return element;
  }

  for (let node of element.childNodes) {
    const tag = node.nodeName;
    let newNode = node;

    if (tag === "#text") {
      newNode = ReplaceOneElement(node, word, url, opts);
    }

    // Check that tags are not excluded from search.
    else if (opts.excludedTags.indexOf(tag) === -1) {
      newNode = ReplaceManyElement(node, word, url, opts);
    }

    // If there are changes - replace nodes.
    if (node !== newNode) {
      node.parentNode.replaceChild(newNode, node);
    }
  }
};

module.exports = ReplaceManyElement;
