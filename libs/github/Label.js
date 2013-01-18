var qx = require('qooxdoo');
var utils =  require('../utils');

qx.Class.define("Label", {
  extend : qx.core.Object,
  include : [ utils.MSerializer],
  statics : {
    objects : new utils.Manager("Label")
  },
  construct: function() {
    this.base(arguments);
    this.constructor.objects.register(this);
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
