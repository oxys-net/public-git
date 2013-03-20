config = require('../config');

//var cafebabel = new Repository(config.get('GITHUB_USER'),config.get('GITHUB_PASSWORD'),config.get('GITHUB_REPOS'));

var repositories = {};

function initRepositories() {
  for(var i=0,l=config.get('REPOSITORIES').length;i<l;i++) {
    var repos = config.get('REPOSITORIES')[i];
    console.log(repos);
    repositories[repos.HOSTNAME] =  new Repository(repos.GITHUB_USER,repos.GITHUB_PASSWORD,repos.GITHUB_REPOS,repos.NAME);
  }
}

exports.getRepositoryForRequest = function(req) {
  return repositories[req.headers.host];
}
initRepositories();
