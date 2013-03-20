var qx = require('qooxdoo'),
    utils =  require('../utils'),
    Label = require('./Label'),
    Issue = require('./Issue'),
    Milestone = require('./Milestone'),
    GitHubApi = require("github");

qx.Class.define("Repository", {
  extend : qx.core.Object,
  include : [ utils.MSerializer],
  construct: function(user, password, repos, name) {
    this.__password = password;
    this.__user = user;
    this.__reposUser = repos.split('/')[0];
    this.__reposName = repos.split('/')[1];
    this.setName(name);
    this.initLabels([]);
    this.initIssues([]);
    this.__refresh();
    setInterval( qx.lang.Function.bind(this.__refresh,this),10000);
  },
  properties: {
    name: {
      deferredInit : true,
      check: "String"
    },
    labels : {
        deferredInit : true,
        check : "Array"
      },
    issues : {
        deferredInit : true,
        check : "Array"
      },
      milestones : {
        deferredInit : true,
        check : "Array"
      }
  },
  members : {
    __password : null,
    __user : null,
    __reposUser : null,
    __reposName : null,
    __name : null,
    __githubConnexion : null,
    __getGithubConnexion : function() {
      if(this.__githubConnexion === null) {
        this.__githubConnexion = new GitHubApi({
          version: "3.0.0",
          timeout: 5000
        });
        this.__githubConnexion.authenticate({
          type: "basic",
          username: this.__user,
          password: this.__password
        });
      }
      return this.__githubConnexion;
    },
    __refresh: function() {
      var githubConnexion = this.__getGithubConnexion();
      githubConnexion.issues.getLabels({
          user:this.__reposUser,
          repo:this.__reposName
        }, qx.lang.Function.bind(function(err,result) {
          if(err) {
            console.log("Github error",err);
            return;
          }
          var list = []
          for (var i=0,l=result.length;i<l;i++) {
            if (result[i].name == 'public') {
              continue;
            }
            var tmp = Label.objects.getOrCreate(this,result[i].url,result[i])
            list.push(tmp);
          }
          this.setLabels(list);
      },this));
      githubConnexion.issues.getAllMilestones({
          user:this.__reposUser,
          repo:this.__reposName,
          state:'open'
        }, qx.lang.Function.bind(function(err,result) {
          if(err) {
            console.log("Github error",err);
            return;
          }
          var list = []
          for (var i=0,l=result.length;i<l;i++) {
            var tmp = Milestone.objects.getOrCreate(this,result[i].number,result[i])
            list.push(tmp);
          }
          githubConnexion.issues.getAllMilestones({
              user:this.__reposUser,
              repo:this.__reposName,
              state:'closed'
            }, qx.lang.Function.bind(function(err,result) {
              if(err) {
                console.log("Github error",err);
                return;
              }
              for (var i=0,l=result.length;i<l;i++) {
                var tmp = Milestone.objects.getOrCreate(this,result[i].number,result[i])
                list.push(tmp);
              }
              this.setMilestones(list);
          },this));
      },this));
      githubConnexion.issues.repoIssues({
          user:this.__reposUser,
          repo:this.__reposName,
          state:'open'
        }, qx.lang.Function.bind(function(err,result) {
          if(err) {
            console.log("Github error",err);
            return;
          }
          var list = []
          for (var i=0,l=result.length;i<l;i++) {
            var tmp = Issue.objects.getOrCreate(this,result[i].number,result[i])
            list.push(tmp);
          }
          githubConnexion.issues.repoIssues({
              user:this.__reposUser,
              repo:this.__reposName,
              state:'closed'
            }, qx.lang.Function.bind(function(err,result) {
              if(err) {
                console.log("Github error",err);
                return;
              }
              for (var i=0,l=result.length;i<l;i++) {
                var tmp = Issue.objects.getOrCreate(this,result[i].number,result[i])
                list.push(tmp);
              }
              this.setIssues(list);
          },this));
      },this));


    }
  }
});
module.exports = Repository;
