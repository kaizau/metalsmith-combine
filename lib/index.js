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
  if (meta.prepend) {
    if (meta.prepend.constructor == Array) {
      return meta.prepend.unshift(file);
    } else if (typeof meta.prepend == 'string') {
      return [meta.prepend, file];
    }
  } else if (meta.append) {
    if (meta.append.constructor == Array) {
      return meta.append.push(file);
    } else if (typeof meta.append == 'string') {
      return [file, meta.append];
    }
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
