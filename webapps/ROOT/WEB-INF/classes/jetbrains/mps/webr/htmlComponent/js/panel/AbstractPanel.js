Webr.component.panel.AbstractPanel = function (panel) {
  Webr.component.panel.AbstractPanel.superclass.constructor.call(this);
  this.panel = panel;
  this.panel.data(Webr.component.ComponentRegistry.COMPONENT_INSTANCE, this);
  this.init();
  var it = this;
  Webr.util.HistoryDispatcher.getInstance().addListener({key: this.panel.attr("watchState"), historyChanged: function (token) {
    it.historyChanged(token);
  }});
};
{
  var F = new Function();
  F.prototype = Webr.component.Component.prototype;
  Webr.component.panel.AbstractPanel.prototype = new F();
  Webr.component.panel.AbstractPanel.prototype.constructor = Webr.component.panel.AbstractPanel;
  Webr.component.panel.AbstractPanel.superclass = Webr.component.Component.prototype;
}

Webr.component.panel.AbstractPanel.prototype.init = function () {
};
Webr.component.panel.AbstractPanel.prototype.setVisible = function (visible) {
  if (visible) {
    this.panel.show();
  } else {
    this.panel.hide();
  }

};
Webr.component.panel.AbstractPanel.prototype.onhistorychanged = function (token) {
  this.panel.trigger("historychanged", token);
};
Webr.component.panel.AbstractPanel.prototype.historyChanged = function (token) {
  this.onhistorychanged();
};
Webr.component.panel.AbstractPanel.prototype.onkeydown = function (e) {
};
