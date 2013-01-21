var Repository = require('../libs/github/Repository'),
    config = require('../config');

var cafebabel = new Repository(config.get('GITHUB_USER'),config.get('GITHUB_PASSWORD'),config.get('GITHUB_REPOS'));


exports.issues = function(req, res){

  res.locals.page = "issues";
  var data = cafebabel.templateData()
  data.request = req;
  res.render('issues', data);
};



exports.milestones = function(req, res){
  res.locals.page = "milestones";
  var data = cafebabel.templateData()
  data.request = req;
  res.render('milestones',data);
};
