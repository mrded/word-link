const _replaceTagElement = require('./replace-tag-element');

module.exports = function(element, word, url, opts) {
  opts = opts || {};
  opts.excludedTags = opts.excludedTags || ['H1', 'H2', 'H3', 'H4', 'H5', 'H6'];

  opts.excludedTags.push('A');

  // Capitalize tags.
  opts.excludedTags = opts.excludedTags.map(function(tag) {
    return tag.toUpperCase();
  });

  _replaceTagElement(element, word, url, opts);
};
