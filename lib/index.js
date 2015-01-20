/*
 * Metalsmith plugin to append or prepend files from metadata
 */
module.exports = function plugin() {
  
  return function(files, ms, done) {
    var list;
    for (var file in files) {
      list = createList(files[file], file);
      if (list.length > 1) {
        files[file].contents = concat(list, files);
      }
    }
    return done();
  };
};

function createList(meta, file) {
  var prepend = meta.prepend || [];
  var append = meta.append || [];
  return Array.prototype.concat.apply([], [prepend, file, append]);
}

function concat(input, files) {
  var contents = '';
  var file;
  
  for (var i in input) {
    file = input[i];
    if (! files[file]) throw new Error(file + ' does not exist.'); 
    contents += files[file].contents;
  }

  return contents;
}
