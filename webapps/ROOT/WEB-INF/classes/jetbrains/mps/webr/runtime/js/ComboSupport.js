Webr.ComboSupport = function () {
};
Webr.ComboSupport.createLocalComboBox = function (config) {
  var store = new Ext.data.SimpleStore({fields: ["vf", "df", "html"], data: config.data});
  var comboConfig = {mode: "local", store: store};
  return Webr.ComboSupport.createComboBox(config, comboConfig);
};
Webr.ComboSupport.createRemoteComboBox = function (config) {
  var proxy = new Ext.data.HttpProxy({url: config.handlerUrl});
  var store = new Ext.data.Store({baseParams: config.baseParams, proxy: proxy, reader: new Ext.data.JsonReader({root: "rows", totalProperty: "totalCount", id: "id"}, [{name: "vf", mapping: "vf"}, {name: "df", mapping: "df"}, {name: "html", mapping: "html"}]), remoteSort: true});
  proxy.on("load", function (proxy, data, args, response) {
    Webr.event.ResponseServerEventListener.processResponse(response, false, "Combobox: ");
  });
  proxy.on("loadexception", function (proxy, response) {
    Webr.event.ResponseServerEventListener.processResponse(response, true, "Combobox: ");
  });
  var pageSize;
  if (config.pageSize) {
    pageSize = new Number(config.pageSize).valueOf();
  }

  var comboConfig = {mode: "remote", loadingText: config.loadingText, pageSize: pageSize, store: store};
  return Webr.ComboSupport.createComboBox(config, comboConfig);
};
Webr.ComboSupport.createComboBox = function (config, comboConfig) {
  Ext.apply(comboConfig, config.options);
  Ext.apply(comboConfig, {hiddenName: config.hiddenName, minChars: 1, typeAhead: true, forceSelection: true, selectOnFocus: true, triggerAction: "all", valueField: "vf", displayField: "df", tpl: new Ext.Template('<div class="x-combo-list-item">{html}</div>')});
  var combo = new Ext.form.ComboBox(comboConfig);
  if (config.hasEmptyElement) {
    combo.on("beforeselect", function (combo, record, index) {
      if (!record["data"]["vf"]) {
        combo.clearValue();
        combo.collapse();
        combo.fireEvent("select", this, record, index);
        return false;
      } else {
        return true;
      }

    });
  }

  if (config.onSelect) {
    combo.on("select", config.onSelect);
  }

  if (config.value) {
    combo.on("render", function () {
      combo.setValue(config.value.df);
      combo.hiddenField.value = config.value.vf;
    });
  }

  Webr.Component.register(config.componentId, combo);
  return combo;
};
Webr.BaseComboSupportConfig = function () {
};
Webr.ComboValue = function () {
};
Webr.LocalComboSupportConfig = function () {
  Webr.LocalComboSupportConfig.superclass.constructor.call(this);
};
{
  var F = new Function();
  F.prototype = Webr.BaseComboSupportConfig.prototype;
  Webr.LocalComboSupportConfig.prototype = new F();
  Webr.LocalComboSupportConfig.prototype.constructor = Webr.LocalComboSupportConfig;
  Webr.LocalComboSupportConfig.superclass = Webr.BaseComboSupportConfig.prototype;
}

Webr.RemoteComboSupportConfig = function () {
  Webr.RemoteComboSupportConfig.superclass.constructor.call(this);
};
{
  var F = new Function();
  F.prototype = Webr.BaseComboSupportConfig.prototype;
  Webr.RemoteComboSupportConfig.prototype = new F();
  Webr.RemoteComboSupportConfig.prototype.constructor = Webr.RemoteComboSupportConfig;
  Webr.RemoteComboSupportConfig.superclass = Webr.BaseComboSupportConfig.prototype;
}

