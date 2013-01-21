var filterIssues = function (state) {
  var templateData = cafebabel.templateData();
  var issues = [];
  templateData.issues = issues;
  return templateData;
}

module.exports = function(context) {

  var request = context.request;

  var state = typeof(request.query.state) == 'undefined' ? 'open' : request.query.state;
  context.openIssues = state == 'open';

  var issues = [];
  for (var i = 0, l = context.issues.length; i<l; i++) {
    if (!context.issues[i].isPublic) {
      continue;
    }

    if (context.issues[i].state == state) {
      issues.push(context.issues[i])
    }
  }
  context.issues = issues;

  return context;
};