var qx = require('qooxdoo');
var utils =  require('../utils');

qx.Class.define("Milestone", {
  extend : qx.core.Object,
  include : [ utils.MSerializer],
  statics : {
    objects : new utils.Manager("Milestone")
  },
  construct: function() {
    this.base(arguments);
    this.constructor.objects.register(this);
  },
  properties: {
    number : {
      deferredInit : true,
      check : "Number",
        },
    title : {
        deferredInit : true,
        check : "String"
      },
    description : {
        deferredInit : true,
        check : "String"
      },
    openIssues : {
      init : null,
      check : "Number",
      apply: '_updateProgress'

    },
    closedIssues : {
      init: null,
      check : "Number",
      apply: '_updateProgress'
    },
    progress : {
      init : 0,
      check : "Number",
    }
  },
  members : {
    getPk : function() {
      return this.getNumber();
    },
    _updateProgress: function() {
      total = this.getClosedIssues()+this.getOpenIssues();
      
      if (total == 0) {
        this.setProgress(100);
      } else {
        console.log(this.getClosedIssues(),total)
        this.setProgress( parseInt(this.getClosedIssues()/total*100));
      }
    },
    __update : function() {
      this._updateProgress();
    }
  }
});

module.exports = Milestone;
