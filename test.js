var blah = require('./index');
var vulcan = require('vulcanize');
var path = require('path');
var options = {};
 // options.input = path.resolve(path.join('polymer-tutorial-master','finished','index.html'));
  //options.input = path.resolve('resume.template');
  //console.log(options.input);

/*

vulcan.setOptions(options, function(err) {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  vulcan.processDocument();

});*/
console.log(blah.render({}));