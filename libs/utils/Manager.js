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
    this.__instances = {};
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
    get: function(repos, pk) {
      if (this.__instances[repos] === undefined) {
        this.__instances[repos] = []
      }
      for(var i=0,l=this.__instances[repos].length;i<l;i++) {
        if(this.__instances[repos][i].getPk() == pk) {
          return this.__instances[repos][i];
        }
      }
      return null;
    },
    getOrCreate: function(repos, pk, json) {
      var obj;
      obj = this.get(repos, pk);
      if(obj === null) {
        obj = new (this.__getManagedClass())();
        obj.fromJson(json);
      }
      obj.fromJson(json);
      return obj;
    },
    register : function(repos, obj) {
      if (this.__instances[repos] === undefined) {
        this.__instances[repos] = []
      }
      this.__instances[repos].push(obj);
    }
  }
});

Manager.dump = dump;
module.exports = Manager;
