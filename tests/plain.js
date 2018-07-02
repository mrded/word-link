const Expect = require('chai').expect;
const WordLink = require('../');

module.exports = function() {
  describe('Given plain text', function() {
    it('Replace one word', function() {
      const text = 'foo bar baz';
      const word = 'bar';
      const url = 'https://demench.uk';

      const output = WordLink.applyText(text, word, url);

      Expect(output).to.equal('foo <a href="https://demench.uk">bar</a> baz');
    });

    it('Replace two words', function() {
      const text = 'foo bar foo';
      const word = 'foo';
      const url = 'https://demench.uk';

      const output = WordLink.applyText(text, word, url);

      Expect(output).to.equal('<a href="https://demench.uk">foo</a> bar <a href="https://demench.uk">foo</a>');
    });

    it('Replace only whole words', function() {
      const text = 'foobar baz';
      const word = 'bar';
      const url = 'https://demench.uk';

      const output = WordLink.applyText(text, word, url);

      Expect(output).to.equal('foobar baz');
    });

    it('Replace one word with regex', function() {
      const text = 'foo bar baz';
      const regex = "(bar)";
      const url = 'https://demench.uk';

      const output = WordLink.applyText(text, regex, url);

      Expect(output).to.equal('foo <a href="https://demench.uk">bar</a> baz');
    });

    it('Replace two words with regex', function() {
      const text = 'foo bar baz';
      const regex = "(foo|bar)";
      const url = 'https://demench.uk';

      const output = WordLink.applyText(text, regex, url);

      Expect(output).to.equal('<a href="https://demench.uk">foo</a> <a href="https://demench.uk">bar</a> baz');
    });
  });
}
