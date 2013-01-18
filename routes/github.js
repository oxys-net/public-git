var Repository = require('../libs/github/Repository')
var cafebabel = new Repository('d.charbonnier@oxys.net',process.env.PASSWORD,'oxys-net/cafebabel');

exports.issues = function(req, res){
  res.locals.page = "issues";
  res.render('issues',cafebabel.templateData());
};


exports.milestones = function(req, res){
  res.locals.page = "milestones";
  res.render('milestones',cafebabel.templateData());
};
