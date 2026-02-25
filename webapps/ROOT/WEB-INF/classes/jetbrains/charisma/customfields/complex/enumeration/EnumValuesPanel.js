cr.setTemplateBind("EnumValuesPanel", function (path) {
  cr.ash(path, "remove", "click", {collectFormElements: false});
  cr.ash(path, "up", "click", null);
  cr.ash(path, "down", "click", null);
  cr.forEach(path, "enumValues", function () {
    Webr.component.ElementExpander.addExpandListener(this, 400);
  });
});
