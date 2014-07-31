var fs = require("fs");
var Handlebars = require("handlebars");
var gravatar = require('gravatar');
var vulcan = require('vulcanize');
var path = require('path');
var _ = require('lodash');
var options = {};
  options.input = path.resolve(path.join(__dirname, 'polymer-tutorial-master','finished','index.html'));
  options.output = __dirname + '/vulcanized.html';
  options.inline = true;
  //options.input = path.resolve('resume.template');



function render(resume) {
	var css = fs.readFileSync(__dirname + "/style.css", "utf-8");
	var template = fs.readFileSync(__dirname + "/resume.template", "utf-8");

	if(resume.basics && resume.basics.email) {
		resume.basics.gravatar = gravatar.url(resume.basics.email, {
                        s: '100',
                        r: 'pg',
                        d: 'mm'
                    });
	}
	_.each(resume.work, function(w){
		w.startDateYear = w.startDate.substr(0,4);
		if(w.endDate) {
			w.endDateYear = w.endDate.substr(0,4);
		} else { 
			w.endDateYear = 'Present'
		}
	});
	_.each(resume.education, function(w){
		w.startDateYear = w.startDate.substr(0,4);
		if(w.endDate) {
			w.endDateYear = w.endDate.substr(0,4);
		} else { 
			w.endDateYear = 'Present'
		}
	});
	var resumeDataTemplate = fs.readFileSync(path.resolve(path.join(__dirname, 'polymer-tutorial-master','finished','resume-data-template.html')), "utf-8");
	var resumeData = Handlebars.compile(resumeDataTemplate)({resume: JSON.stringify(resume)});
	console.log(JSON.stringify(resume))
	fs.writeFileSync(path.resolve(path.join(__dirname, 'polymer-tutorial-master','finished','resume-data.html')), resumeData);
	/*return Handlebars.compile(template)({
		css: css,
		resume: resume
	});*/

console.log('vulcanize');
	vulcan.setOptions(options, function(err) {
	//console.log(arguments);
	  vulcan.processDocument();

	});

	  var file = fs.readFileSync(__dirname + '/vulcanized.html', 'utf8');
	 // console.log(file);
		return file;

}

module.exports = {
	render: render
};
