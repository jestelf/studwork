Webr.component.panel.FormPanel = function () {
  Webr.component.panel.FormPanel.superclass.constructor.call(this);
};
{
  var F = new Function();
  F.prototype = Webr.component.panel.Panel.prototype;
  Webr.component.panel.FormPanel.prototype = new F();
  Webr.component.panel.FormPanel.prototype.constructor = Webr.component.panel.FormPanel;
  Webr.component.panel.FormPanel.superclass = Webr.component.panel.Panel.prototype;
}

