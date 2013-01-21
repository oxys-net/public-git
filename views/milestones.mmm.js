module.exports = function(context) {

  var request = context.request;

  // get state from request
  var state = typeof(request.query.state) == 'undefined' ? 'open' : request.query.state;
  context.openMilestones = state == 'open';

  var milestones = [];
  for (var i = 0, l = context.milestones.length;i<l;i++) {

    //filter on milestone status
    if (context.milestones[i].state != state) {
      continue;
    }
    
    // populate issues
    context.milestones[i].issues = [];
    for (var j = 0, m = context.issues.length;j<m;j++) {
      if(context.issues[j].milestone != null && context.issues[j].milestone.number == context.milestones[i].number && context.issues[j].isPublic) {
        context.milestones[i].issues.push(context.issues[j]);
      }
    }

    // define issues count
    context.milestones[i].visibleIssues = context.milestones[i].issues.length;

    // define hidden issues count
    context.milestones[i].hiddenIssues = context.milestones[i].openIssues + context.milestones[i].closedIssues - context.milestones[i].issues.length;

    // define id for html
    context.milestones[i].htmlId = context.milestones[i].title.toLowerCase().replace(' ','-').replace('.','-');

    // set new data
    milestones.push(context.milestones[i]);
    
  }
  context.milestones = milestones;

  return context;
};
