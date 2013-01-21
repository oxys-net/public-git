var Repository = require('../libs/github/Repository'),
    config = require('../config');

var repository = new Repository(config.get('GITHUB_USER'),config.get('GITHUB_PASSWORD'),config.get('GITHUB_REPOS'));

exports.issues = function(req, res){
  res.locals.page = "issues";
  res.render('issues',repository.templateData());
};


exports.milestones = function(req, res){
  res.locals.page = "milestones";
  res.render('milestones',repository.templateData());
};
