# Word Link

Allows you to automatically convert specific words into links.

## Installation

- [Latest release](https://github.com/mrded/word-link/releases)
- Bower: `bower install word-link`
- NPM: `npm install word-link`

## Usage

```javascript
var WordLink = require('word-link');
var text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
```

Replace words with a link:

```javascript
WordLink.applyText(text, 'ipsum', 'http://example.com');
// "Lorem <a href="http://example.com" target="_blank">ipsum</a> dolor sit amet, consectetur adipiscing elit."
```

Find words with regex and replace them with a link:

```javascript
WordLink.applyText(text, '(ipsum|elit)', 'http://example.com');
// "Lorem <a href="http://example.com" target="_blank">ipsum</a> dolor sit amet, consectetur adipiscing <a href="http://example.com" target="_blank">elit</a>."
```

**Word Link** understands html. It will ignore existed links and tag attributes:

```javascript
var html = '<p>Lorem <a href="http://ipsum.com" class="ipsum">ipsum</a> dolor sit amet, consectetur adipiscing elit.</p>';

WordLink.applyText(html, 'ipsum', 'http://example.com');
// "<p>Lorem <a href="http://ipsum.com" class="ipsum">ipsum</a> dolor sit amet, consectetur adipiscing elit.</p>"
```

