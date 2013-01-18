var qx = require('qooxdoo');


var managers = [];

function dump() {
  var c = 0;
  for(var i = 0,l=managers.length;i<l;i++) {
    c+=managers[i].__instances.length;
  }
  console.log(c);
}

qx.Class.define("Manager", {
  extend : qx.core.Object,
  construct : function(managedClass) {
    this.__managedClassName = managedClass;
    this.__instances = [];
    managers.push(this);
  },
  members : {
    __managedClass : null,
    __managedClassName : null,
    __instances : null,
    __getManagedClass : function() {
      if( this.__managedClass  === null ) {
        this.__managedClass = qx.Class.getByName(this.__managedClassName);
      }
      return this.__managedClass;
    },
    get: function(pk) {
      for(var i=0,l=this.__instances.length;i<l;i++) {
        if(this.__instances[i].getPk() == pk) {
          return this.__instances[i];
        }
      }
      return null;
    },
    getOrCreate: function(pk, json) {
      var obj;
      obj = this.get(pk);
      if(obj === null) {
        obj = new (this.__getManagedClass())();
        obj.fromJson(json);
      }
      obj.fromJson(json);
      return obj;
    },
    register : function(obj) {
      this.__instances.push(obj);
    }
  }
});

Manager.dump = dump;
module.exports = Manager;
