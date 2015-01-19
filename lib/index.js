/*
 * Metalsmith plugin to append or prepend files from metadata
 */
module.exports = function plugin() {
  
  return function(files, ms, done) {
    var list;
    for (var file in files) {
      list = createList(files[file], file);
      if (list) {
        files[file].contents = concat(list, files);
      }
    }
    return done();
  };
};

function createList(meta, file) {
  if (meta.prepend && meta.append) {
    return meta.prepend.concat([file]).concat(meta.append);
  } else if (meta.prepend) {
    return meta.prepend.concat([file]);
  } else if (meta.append) {
    return [file].concat(meta.append);
  }
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
