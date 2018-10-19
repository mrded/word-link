const Expect = require('chai').expect;
const ReplaceOneElement = require('./index.js');

// Define global `document` and `window` objects to act as a browser.
const JSDOM = require("jsdom").JSDOM;
const dom = new JSDOM('<!doctype html><html><body></body></html>');

global.document = dom.window.document;

describe('replace-one-element', function() {
  it('Replace one word', function() {
    const element = document.createTextNode("foo bar baz");
    const newElement = ReplaceOneElement(element, 'bar', '#', {});

    Expect(newElement.innerHTML).to.equal('foo <a href="#">bar</a> baz');
  });

  it('Replace two words', function() {
    const element = document.createTextNode("foo bar foo");
    const newElement = ReplaceOneElement(element, 'foo', '#', {});

    Expect(newElement.innerHTML).to.equal('<a href="#">foo</a> bar <a href="#">foo</a>');
  });

  it('Replace only whole words', function() {
    const element = document.createTextNode("foobar baz");
    const newElement = ReplaceOneElement(element, 'foo', '#', {});

    // Because text elements don't have innerHTML, only textContent.
    Expect(newElement.innerHTML).to.equal(undefined);
    Expect(newElement.textContent).to.equal('foobar baz');
  });

  it('Replace one word with regex', function() {
    const element = document.createTextNode("foo bar baz");
    const newElement = ReplaceOneElement(element, '(bar)', '#', {});

    Expect(newElement.innerHTML).to.equal('foo <a href="#">bar</a> baz');
  });

  it('Replace two words with regex', function() {
    const element = document.createTextNode("foo bar baz");
    const newElement = ReplaceOneElement(element, '(foo|baz)', '#', {});

    Expect(newElement.innerHTML).to.equal('<a href="#">foo</a> bar <a href="#">baz</a>');
  });
});
