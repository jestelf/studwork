Webr.extjs.LazyWindows = function () {
};
Webr.extjs.LazyWindows.windowConstructors = [];
Webr.extjs.LazyWindows.register = function (id, win) {
  Webr.extjs.LazyWindows.windowConstructors[id] = win;
};
Webr.extjs.LazyWindows.get = function (id) {
  var res = Ext.ComponentMgr.get(id);
  if (!res) {
    res = Webr.extjs.LazyWindows.windowConstructors[id].call();
    Webr.extjs.LazyWindows.windowConstructors[id] = null;
  }

  return res;
};
