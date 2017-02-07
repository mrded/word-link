# Word Link

Allows you to convert specific words into links. Inspired by Drupal module [word_link](https://www.drupal.org/project/word_link).

## Installation

- [Latest release](https://github.com/mrded/word-link/releases)
- Bower: `bower install word-link`
- NPM: `npm install word-link`

## Usage

`WordLink.applyText(text, word|regexp, url, opts);`

|   | Argument          | Type         | Default                                | Details                                                                      |
|---|-------------------|--------------|----------------------------------------|------------------------------------------------------------------------------|
| 1 | text              | `String`     |                                        | Text in which you want to replace the word to word-links.                    |
| 2 | word              | `String`     |                                        | A String or RegExp that is to be replaced by word-link.                      |
| 3 | url               | `String`     |                                        | A URL to be used to generate a word-link.                                    |
| 4 | opts              | `Dictionary` |                                        | *(optional)* Additional seetings.                                            |
|   | opts.debug        | `Boolean`    | `false`                                | *(optional)* Enable debugging mode. Shows a console.log with replaced words. |
|   | opts.excludedTags | `Array`      | `['H1', 'H2', 'H3', 'H4', 'H5', 'H6']` | *(optional)* List of HTML tags to be ignored during replacement.             |

### Returns
**Type:** `String`

Text with replaced word-links.


## Examples

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

## TODOs
- [X] A setting for tags to be ignored.
- [ ] Settings for a link.
- [ ] Add tests.
