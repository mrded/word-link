// Define global `document` and `window` objects to act as a browser.
const JSDOM = require("jsdom").JSDOM;
const dom = new JSDOM('<!doctype html><html><body></body></html>');

global.document = dom.window.document;
global.window = global.document.defaultView;

const PlainSpec = require('./plain');
const HtmlSpec = require('./html');

PlainSpec();
HtmlSpec();
