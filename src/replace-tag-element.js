const ReplaceTextElement = require('./replace-text-element');

const ReplaceTagElement = function(element, word, url, opts) {
  // No children? Return!
  if (!element.childNodes || !element.childNodes.length) {
    return element;
  }

  for (let node of element.childNodes) {
    const tag = node.nodeName;
    let newNode = node;

    if (tag === "#text") {
      newNode = ReplaceTextElement(node, word, url, opts);
    }

    // Check that tags are not excluded from search.
    else if (opts.excludedTags.indexOf(tag) === -1) {
      newNode = ReplaceTagElement(node, word, url, opts);
    }

    // If there are changes - replace nodes.
    if (node !== newNode) {
      node.parentNode.replaceChild(newNode, node);
    }
  }
};

module.exports = ReplaceTagElement;
