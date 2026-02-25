Webr.component.panel.Panel = function (panel) {
  Webr.component.panel.Panel.superclass.constructor.call(this, panel);
};
{
  var F = new Function();
  F.prototype = Webr.component.panel.AbstractPanel.prototype;
  Webr.component.panel.Panel.prototype = new F();
  Webr.component.panel.Panel.prototype.constructor = Webr.component.panel.Panel;
  Webr.component.panel.Panel.superclass = Webr.component.panel.AbstractPanel.prototype;
}

