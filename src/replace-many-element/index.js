const ReplaceOneElement = require('./replace-one-element');

/**
 * Replace text inside an element with children.
 *
 * @param {object} element - The element.
 * @param {string} word - The text to be replaced.
 * @param {string} url - The url of a link.
 * @param {object} opts - Options.
 *
 * @returns {object} An Element with word-links.
 */
const ReplaceManyElement = function(element, word, url, opts) {
  // No children? Return!
  if (!element.childNodes || element.childNodes.length === 0) {
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

  return element;
};

module.exports = ReplaceManyElement;
