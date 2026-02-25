Webr.MultiSelectSupport = function () {
};
Webr.MultiSelectSupport.createLocalMultiSelect = function (config) {
  var store = new Ext.data.SimpleStore({fields: ["vf", "df", "html"], data: config.data});
  var multiSelectConfig = {store: store};
  return Webr.MultiSelectSupport.createMultiSelect(config, multiSelectConfig);
};
Webr.MultiSelectSupport.createRemoteMultiSelect = function (config) {
  var proxy = new Ext.data.HttpProxy({url: config.handlerUrl});
  var store = new Ext.data.Store({baseParams: config.baseParams, proxy: proxy, reader: new Ext.data.JsonReader({root: "rows", totalProperty: "totalCount", id: "id"}, [{name: "vf", mapping: "vf"}, {name: "df", mapping: "df"}, {name: "html", mapping: "html"}]), remoteSort: true});
  proxy.on("load", function (proxy, data, args, response) {
    Webr.event.ResponseServerEventListener.processResponse(response, false, "Multiselect: ");
  });
  proxy.on("loadexception", function (proxy, response) {
    Webr.event.ResponseServerEventListener.processResponse(response, true, "Multiselect: ");
  });
  var multiSelectConfig = {store: store};
  return Webr.MultiSelectSupport.createMultiSelect(config, multiSelectConfig);
};
Webr.MultiSelectSupport.createMultiSelect = function (config, multiSelectConfig) {
  Ext.apply(multiSelectConfig, config.options);
  Ext.apply(multiSelectConfig, {name: config.name, valueField: "vf", displayField: "html"});
  var multiSelect = new Ext.ux.Multiselect(multiSelectConfig);
  if (config.onSelect) {
    multiSelect.on("select", config.onSelect);
  }

  if (config.values) {
    var loaded = false;
    var rendered = multiSelect.rendered;
    var inited = false;
    multiSelectConfig.store.on("load", function () {
      loaded = true;
      if (rendered && !inited) {
        inited = true;
        multiSelect.setValue(config.values);
      }

    });
    multiSelect.on("render", function () {
      rendered = true;
      if (loaded && !inited) {
        inited = true;
        multiSelect.setValue(config.values);
      }

    });
  }

  multiSelectConfig.store.load();
  Webr.Component.register(config.componentId, multiSelect);
  return multiSelect;
};
Webr.BaseMultiSelectSupportConfig = function () {
};
Webr.LocalMultiSelectSupportConfig = function () {
  Webr.LocalMultiSelectSupportConfig.superclass.constructor.call(this);
};
{
  var F = new Function();
  F.prototype = Webr.BaseMultiSelectSupportConfig.prototype;
  Webr.LocalMultiSelectSupportConfig.prototype = new F();
  Webr.LocalMultiSelectSupportConfig.prototype.constructor = Webr.LocalMultiSelectSupportConfig;
  Webr.LocalMultiSelectSupportConfig.superclass = Webr.BaseMultiSelectSupportConfig.prototype;
}

Webr.RemoteMultiSelectSupportConfig = function () {
  Webr.RemoteMultiSelectSupportConfig.superclass.constructor.call(this);
};
{
  var F = new Function();
  F.prototype = Webr.BaseMultiSelectSupportConfig.prototype;
  Webr.RemoteMultiSelectSupportConfig.prototype = new F();
  Webr.RemoteMultiSelectSupportConfig.prototype.constructor = Webr.RemoteMultiSelectSupportConfig;
  Webr.RemoteMultiSelectSupportConfig.superclass = Webr.BaseMultiSelectSupportConfig.prototype;
}

