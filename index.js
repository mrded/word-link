'use strict';

var _uniq = function(items) {
  return items.filter(function(item, pos) {
    return items.indexOf(item) == pos;
  });
};

var _createLink = function(text, url, opts) {
  //@TODO: Generate a link based on opts.
  return '<a href=":url" target="_blank">:text</a>'.replace(':text', text).replace(':url', url);
}

var _replaceTextElement = function(element, word, url, opts) {
  //@TODO: Generate pattern based on opts.
  var pattern = "\\b:text\\b";

  var findRegexp = new RegExp(pattern.replace(':text', word), 'ig');
  var found = element.data.match(findRegexp);

  if (found) {
    found = _uniq(found);

    if (opts.debug) {
      console.info(':: Wordlink', found, url);
    }

    var newElement = document.createElement('span');

    for (var j in found) {
      var foundRegexp = new RegExp(pattern.replace(':text', found[j]), 'g');
      element.data = element.data.replace(foundRegexp, _createLink(found[j], url, opts));
    }

    newElement.innerHTML = element.data;

    element.parentNode.replaceChild(newElement, element);
  }
};

var _replaceTagElement = function(element, word, url, opts) {
  //@TODO: Generate excludedTags based on opts.
  var excludedTags = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'A'];

  if (element.childNodes.length, element.childNodes) {
    for (var i in element.childNodes) {
      var node = element.childNodes[i];
      var tag = node.nodeName;

      if (tag === undefined) {
        // Ignore.
      }

      else if (tag === "#text") {
        _replaceTextElement(node, word, url, opts);
      }

      else if (excludedTags.indexOf(tag) === -1) {
        _replaceTagElement(node, word, url, opts);
      }
    }
  }
};

module.exports.applyText = function(text, word, url, opts) {
  var element = document.createElement('div');
  element.innerHTML = text;

  applyElement(element, word, url, opts || {});

  return element.innerHTML;
};

module.exports.applyElement = function(element, word, url, opts) {
  _replaceTagElement(element, word, url, opts || {});
};
