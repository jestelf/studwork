cr.setTemplateBind("EditRole", function (path) {
  cr.ash(path, "saveRole", "click", null);
  cr.ash(path, "cancelRole", "click", null);
  cr.ash(path, "clearRole", "click", null);
});
