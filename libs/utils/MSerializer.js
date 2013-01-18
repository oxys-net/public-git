var qx = require('qooxdoo');

qx.Mixin.define("MSerializer", {
  extend : qx.core.Object,
  construct: function() {
    
  },
  members : {
    fromJson : function(json) {
      var properties = qx.util.PropertyUtil.getAllProperties(this.constructor);
      var keys = Object.keys(properties);
      for(var i=0,l=keys.length;i<l;i++) {
        var key = keys[i];
        var value = properties[key];
        var propertyName = qx.lang.String.camelCase(key.replace('_','-'));
        var jsonKey = qx.lang.String.hyphenate('$'+key).replace('$','').replace('-','_');
        if (typeof(json[jsonKey]) !== "undefined") {

          var fName = "set"+qx.lang.String.firstUp(propertyName)+"FromJson";
          if (qx.lang.Type.isFunction(this[fName])) {
            this[fName](json[jsonKey]);

          } else {
            qx.util.PropertyUtil.setInitValue(this, propertyName, json[jsonKey])
          }
        }
      }
      if(this.__update !== undefined) {
        this.__update()
      }
    },
    __convertValue : function(value) {
        if(qx.lang.Type.isArray(value)) {
          var result = [];
          for(var i=0,l=value.length;i<l;i++) {
            result.push(this.__convertValue(value[i]));
          }
          return result;
        }
        if(qx.lang.Type.isObject(value) && qx.lang.Type.isFunction(value['templateData'])) {
          return value['templateData']();
        }
        return value;
    },
    templateData : function() {
      var data = {};
      var properties = qx.util.PropertyUtil.getAllProperties(this.constructor);
      var keys = Object.keys(properties);
      for(var i=0,l=keys.length;i<l;i++) {
        var key = keys[i];
        propertyName = qx.lang.String.camelCase(key.replace('-','_'));
        try {
          data[key] = this.__convertValue(this["get"+qx.lang.String.firstUp(propertyName)]());
        } catch(e) {}
      }
      return data;
    }   
  }
});

module.exports = MSerializer;
