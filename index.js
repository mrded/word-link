'use strict';

var _uniq = function(items) {
  return items.filter(function(item, pos) {
    return items.indexOf(item) === pos;
  });
};

var _createLink = function(text, url, attributes) {
  attributes = attributes || {};

  var a = document.createElement('a');
  var linkText = document.createTextNode(text);

  a.appendChild(linkText);
  a.href = url;

  // Add given attributes.
  for (var name in attributes) {
    a[name] = attributes[name];
  } 

  return a.outerHTML;
}

var _replaceTextElement = function(element, word, url, opts) {
  var opts = opts || {};

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
      element.data = element.data.replace(foundRegexp, _createLink(found[j], url, opts.attributes));
    }

    newElement.innerHTML = element.data;

    element.parentNode.replaceChild(newElement, element);
  }
};

var _replaceTagElement = function(element, word, url, opts) {
  //@TODO: WTF?
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

      else if (opts.excludedTags.indexOf(tag) === -1) {
        _replaceTagElement(node, word, url, opts);
      }
    }
  }
};

var applyText = function(text, word, url, opts) {
  var element = document.createElement('div');
  element.innerHTML = text;

  applyElement(element, word, url, opts);

  // The processed text will be wrapped into <SPAN>. 
  // Return firstChild to keep it plaintext.
  return element.firstChild.nodeName === '#text'
    ? element.innerHTML
    : element.firstChild.innerHTML;
};

var applyElement = function(element, word, url, opts) {
  opts = opts || {};
  opts.excludedTags = opts.excludedTags || ['H1', 'H2', 'H3', 'H4', 'H5', 'H6'];

  opts.excludedTags.push('A');

  // Capitalize tags.
  opts.excludedTags = opts.excludedTags.map(function(tag) {
    return tag.toUpperCase();
  });

  _replaceTagElement(element, word, url, opts);
};

module.exports = {
  applyText: applyText,
  applyElement: applyElement
};
