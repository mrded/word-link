/**
 * word-link - @version v1.0.1 - @author Dmitry Demenchuk @mrded (dmitry@demenchuk.me)
 */
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var a = typeof require == "function" && require;if (!u && a) return a(o, !0);if (i) return i(o, !0);throw new Error("Cannot find module '" + o + "'");
      }var f = n[o] = { exports: {} };t[o][0].call(f.exports, function (e) {
        var n = t[o][1][e];return s(n ? n : e);
      }, f, f.exports, e, t, n, r);
    }return n[o].exports;
  }var i = typeof require == "function" && require;for (var o = 0; o < r.length; o++) {
    s(r[o]);
  }return s;
})({ 1: [function (require, module, exports) {
    var ReplaceManyElement = require('./replace-many-element');

    module.exports = function (element, word, url, opts) {
      opts = opts || {};
      opts.excludedTags = opts.excludedTags || ['H1', 'H2', 'H3', 'H4', 'H5', 'H6'];

      opts.excludedTags.push('A');

      // Capitalize tags.
      opts.excludedTags = opts.excludedTags.map(function (tag) {
        return tag.toUpperCase();
      });

      return ReplaceManyElement(element, word, url, opts);
    };
  }, { "./replace-many-element": 5 }], 2: [function (require, module, exports) {
    var applyElement = require('./apply-element');

    module.exports = function (text, word, url, opts) {
      var element = document.createElement('div');
      element.innerHTML = text;

      var newElement = applyElement(element, word, url, opts);

      return newElement.innerHTML;
    };
  }, { "./apply-element": 1 }], 3: [function (require, module, exports) {
    module.exports = function (text, url, attributes) {
      attributes = attributes || {};

      var a = document.createElement('a');
      var linkText = document.createTextNode(text);

      a.appendChild(linkText);
      a.href = url;

      // Add given attributes.
      for (var name in attributes) {
        switch (name) {
          case 'class':
            a.className = attributes[name];
            break;

          default:
            a[name] = attributes[name];
        }
      }

      return a.outerHTML;
    };
  }, {}], 4: [function (require, module, exports) {
    (function (root, factory) {
      /* globals define */
      if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], factory);
      } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === 'object' && typeof exports !== 'undefined') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory();
      } else {
        // Browser globals (root is window)
        root.WordLink = factory();
      }
    })(this, function () {
      return {
        apply: require('./apply-text')
      };
    });
  }, { "./apply-text": 2 }], 5: [function (require, module, exports) {
    var ReplaceOneElement = require('./replace-one-element');

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
    var ReplaceManyElement = function ReplaceManyElement(element, word, url, opts) {
      // No children? Return!
      if (!element.childNodes || element.childNodes.length === 0) {
        return element;
      }

      var newElement = element.cloneNode(true);

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = newElement.childNodes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var node = _step.value;

          var tag = node.nodeName;
          var newNode = node;

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
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return newElement;
    };

    module.exports = ReplaceManyElement;
  }, { "./replace-one-element": 6 }], 6: [function (require, module, exports) {
    var _uniq = require('./uniq');
    var _createLink = require('./create-link');

    var replaceMany = function replaceMany(text, words, url, attributes) {
      attributes = attributes || {};

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = words[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var word = _step2.value;

          var foundRegexp = new RegExp("\\b" + word + "\\b", 'g');
          var link = _createLink(word, url, attributes);

          text = text.replace(foundRegexp, link);
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      return text;
    };

    var createElement = function createElement(text) {
      var element = document.createElement('span');

      element.innerHTML = text;

      return element;
    };

    /**
     * Replace text inside an element without children.
     *
     * @param {object} element - The element.
     * @param {string} word - The text to be replaced.
     * @param {string} url - The url of a link.
     * @param {object} opts - Options.
     *
     * @returns {object} An Element with word-links.
     */
    module.exports = function (element, word, url, opts) {
      opts = opts || {};

      //@TODO: Generate pattern based on opts.
      var findRegexp = new RegExp("\\b" + word + "\\b", 'ig');
      var found = element.data.match(findRegexp);

      if (found) {
        found = _uniq(found);

        if (opts.debug) {
          console.info(':: Wordlink', found, url);
        }

        var text = replaceMany(element.data, found, url, opts.attributes);

        return createElement(text);
      }

      return element;
    };
  }, { "./create-link": 3, "./uniq": 7 }], 7: [function (require, module, exports) {
    // Used to delete duplicates.
    module.exports = function (items) {
      return items.filter(function (item, pos) {
        return items.indexOf(item) === pos;
      });
    };
  }, {}] }, {}, [4]);