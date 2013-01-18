
/*
 * GET home page.
 */
var github = require('../libs/github/index.js');
exports.index = function(req, res){

  var issue = new github.Issue();
  issue.setTitle('ooo');
  res.render('index', { issue: issue });
};
