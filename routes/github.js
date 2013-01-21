var Repository = require('../libs/github/Repository')
var cafebabel = new Repository(process.env.GITHUB_USER,process.env.GITHUB_PASSWORD,process.env.GITHUB_REPOS);

exports.issues = function(req, res){
  res.locals.page = "issues";
  res.render('issues',cafebabel.templateData());
};


exports.milestones = function(req, res){
  res.locals.page = "milestones";
  res.render('milestones',cafebabel.templateData());
};
