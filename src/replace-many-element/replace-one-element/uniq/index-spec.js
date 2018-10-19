const Expect = require('chai').expect;
const Uniq = require('./index');

describe('uniq', function() {
  it('empty array', function() {
    Expect(Uniq([])).to.eql([]);
  });

  it('one item', function() {
    Expect(Uniq(['foo'])).to.eql(['foo']);
  });

  it('two unique items', function() {
    Expect(Uniq(['foo', 'bar'])).to.eql(['foo', 'bar']);
  });

  it('two the same items', function() {
    Expect(Uniq(['foo', 'foo'])).to.eql(['foo']);
  });

  it('three the same items', function() {
    Expect(Uniq(['foo', 'foo', 'foo'])).to.eql(['foo']);
  });
});
