// Used to delete duplicates.
module.exports = function(items) {
  return items.filter(function(item, pos) {
    return items.indexOf(item) === pos;
  });
};
