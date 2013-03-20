var qx = require('qooxdoo');
var utils =  require('../utils');

qx.Class.define("Label", {
  extend : qx.core.Object,
  include : [ utils.MSerializer],
  statics : {
    objects : new utils.Manager("Label")
  },
  construct: function(repos) {
    this.base(arguments);
    this.constructor.objects.register(repos, this);
  },
  properties: {
    url : {
        deferredInit : true,
        check : "String"
      },
    name : {
        deferredInit : true,
        check : "String"
      },
    color : {
        deferredInit : true,
        check : "String"
      }
  },
  members : {
    getPk : function() {
      return this.getUrl();
    }
  }
});

module.exports = Label;
