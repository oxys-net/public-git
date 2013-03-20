var qx = require('qooxdoo');
var utils =  require('../utils');

qx.Class.define("Issue", {
  extend : qx.core.Object,
  include : [ utils.MSerializer],
  statics : {
    objects : new utils.Manager("Issue")
  },
  construct: function(repos) {
    this.base(arguments);
    this.__repos = repos;
    this.constructor.objects.register(repos, this);

  },
  properties: {
    number : {
       deferredInit : true,
        check : "Number"
      },
    state : {
       deferredInit : true,
        check : [ "open", "closed"]
      },
    title : {
       deferredInit : true,
        check : "String"
      },
    body : {
       deferredInit : true,
        check : "String"
      },
    labels : {
       deferredInit : true,
        check : "Array"
      },
    milestone : {
       deferredInit : true,
        check : "Milestone"
      },
    closedAt : {
       deferredInit : true,
        check : "Date"
      },
    createdAt : {
       deferredInit : true,
        check : "Date"
      },
    updatedAt : {
       deferredInit : true,
        check : "Date"
      },
    isPublic : {
       deferredInit : true,
        check : "Boolean"
      }
  },
  members : {
    __repos : null,
    getPk : function() {
      return this.getNumber();
    },
    setMilestoneFromJson : function(json) {
      if (json == null) {
        this.initMilestone(null);
      } else {
        var obj = Milestone.objects.getOrCreate(this.__repos,json.number,json);
        this.initMilestone(obj);
      }
    },
    setLabelsFromJson : function(json) {
      this.initIsPublic(false);
      var list = [];
      for(var i=0,l=json.length;i<l;i++) {
        if (json[i].name == 'public') {
            this.initIsPublic(true);
            continue;
        }
        var obj = Label.objects.getOrCreate(this.__repos,json[i].url,json[i]);
        list.push(obj);
      }
      this.initLabels(list);
    }

  }
});
module.exports = Issue;
