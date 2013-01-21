module.exports = function(context) {
  for (var i = 0, l = context.milestones.length;i<l;i++) {
    context.milestones[i].htmlId = context.milestones[i].title.toLowerCase().replace(' ','-');
  }
  return context;
};