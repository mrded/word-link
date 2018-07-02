const Expect = require('chai').expect;
const WordLink = require('./index.js');

// Define global `document` and `window` objects to act as a browser.
const JSDOM = require("jsdom").JSDOM;
const dom = new JSDOM('<!doctype html><html><body></body></html>');

global.document = dom.window.document;
global.window = global.document.defaultView;

describe('index', function() {
  const url = 'https://demench.uk';

  it('Replace one word', function() {
    const text = 'foo bar baz';
    const word = 'bar';

    const output = WordLink.applyText(text, word, url);

    Expect(output).to.equal('foo <a href="https://demench.uk">bar</a> baz');
  });

  it('Replace two words', function() {
    const text = 'foo bar foo';
    const word = 'foo';

    const output = WordLink.applyText(text, word, url);

    Expect(output).to.equal('<a href="https://demench.uk">foo</a> bar <a href="https://demench.uk">foo</a>');
  });

  it('Replace only whole words', function() {
    const text = 'foobar baz';
    const word = 'bar';

    const output = WordLink.applyText(text, word, url);

    Expect(output).to.equal('foobar baz');
  });

  it('Replace one word with regex', function() {
    const text = 'foo bar baz';
    const regex = "(bar)";

    const output = WordLink.applyText(text, regex, url);

    Expect(output).to.equal('foo <a href="https://demench.uk">bar</a> baz');
  });

  it('Replace two words with regex', function() {
    const text = 'foo bar baz';
    const regex = "(foo|bar)";

    const output = WordLink.applyText(text, regex, url);

    Expect(output).to.equal('<a href="https://demench.uk">foo</a> <a href="https://demench.uk">bar</a> baz');
  });
});
