Webr.ExtInit = function () {
};
Webr.ExtInit.tipsInited = false;
Webr.ExtInit.init = function () {
  Ext.BLANK_IMAGE_URL = "<!TextGen not found for 'jetbrains.mps.webr.uri.structure.ClasspathUri'!>";
  Ext.lib.Ajax.defaultPostHeader = "application/x-www-form-urlencoded; charset=UTF-8";
  Ext.state.Manager.setProvider(new Ext.state.CookieProvider({path: window.location.pathname}));
};
Webr.ExtInit.initTips = function () {
  if (!Webr.ExtInit.tipsInited) {
    Ext.QuickTips.init();
    Webr.ExtInit.tipsInited = true;
  }

};
