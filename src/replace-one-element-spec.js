const Expect = require('chai').expect;
const ReplaceOneElement = require('./replace-one-element.js');

// Define global `document` and `window` objects to act as a browser.
const JSDOM = require("jsdom").JSDOM;
const dom = new JSDOM('<!doctype html><html><body></body></html>');

global.document = dom.window.document;

const createElement = function(text) {
  const element = document.createElement('span');

  element.data = text;

  return element;
};

describe('replace-one-element', function() {
  it('Replace one word', function() {
    const element = createElement("foo bar baz");
    const newElement = ReplaceOneElement(element, 'bar', '#', {});

    Expect(newElement.innerHTML).to.equal('foo <a href="#">bar</a> baz');
  });

  it('Replace two words', function() {
    const element = createElement("foo bar foo");
    const newElement = ReplaceOneElement(element, 'foo', '#', {});

    Expect(newElement.innerHTML).to.equal('<a href="#">foo</a> bar <a href="#">foo</a>');
  });

  it('Replace only whole words', function() {
    const element = createElement("foobar baz");
    const newElement = ReplaceOneElement(element, 'foo', '#', {});

    Expect(newElement.innerHTML).to.equal('foobar baz');
  });

  it('Replace one word with regex', function() {
    const element = createElement("foo bar baz");
    const newElement = ReplaceOneElement(element, '(bar)', '#', {});

    Expect(newElement.innerHTML).to.equal('foo <a href="#">bar</a> baz');
  });

  it('Replace two words with regex', function() {
    const element = createElement("foo bar baz");
    const newElement = ReplaceOneElement(element, '(foo|baz)', '#', {});

    Expect(newElement.innerHTML).to.equal('<a href="#">foo</a> bar <a href="#">baz</a>');
  });
});
