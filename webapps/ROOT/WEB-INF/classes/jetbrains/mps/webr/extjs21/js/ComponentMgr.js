Webr.extjs.ComponentMgr = function () {
};
Webr.extjs.ComponentMgr.onAvailable = function (id, fn) {
  var c = Ext.ComponentMgr.get(id);
  if (c) {
    fn(c);
  } else {
    Ext.ComponentMgr.onAvailable(id, fn);
  }

};
