var Repository = require('../libs/github/Repository'),
    getRepositoryForRequest = require('../libs').getRepositoryForRequest;
exports.issues = function(req, res){

  res.locals.page = "issues";
  var data = getRepositoryForRequest(req).templateData()
  data.request = req;
  data.pageIssues = true;
  res.render('issues', data);
};



exports.milestones = function(req, res){
  res.locals.page = "milestones";
  var data = getRepositoryForRequest(req).templateData()
  data.request = req;
  data.pageMilestones = true;
  res.render('milestones',data);
};
