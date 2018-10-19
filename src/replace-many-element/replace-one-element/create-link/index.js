module.exports = function(text, url, attributes) {
  attributes = attributes || {};

  const a = document.createElement('a');
  const linkText = document.createTextNode(text);

  a.appendChild(linkText);
  a.href = url;

  // Add given attributes.
  for (let name in attributes) {
    switch (name) {
      case 'class':
        a.className = attributes[name];
        break;

      default: 
        a[name] = attributes[name];
    }
  } 

  return a.outerHTML;
}
