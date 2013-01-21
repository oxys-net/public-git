module.exports = function(context) {

  var request = context.request;

  var state = typeof(request.query.state) == 'undefined' ? 'open' : request.query.state;
  context.openMilestones = state == 'open';

  var milestones = [];
  for (var i = 0, l = context.milestones.length;i<l;i++) {
    if (context.milestones[i].state != state) {
      continue;
    }
    context.milestones[i].htmlId = context.milestones[i].title.toLowerCase().replace(' ','-');
    milestones.push(context.milestones[i]);
    
  }
  context.milestones = milestones;

  return context;
};