cr.setTemplateBind("MultiSelectorEditor", function (path) {
  cr.ash(path, "enumValues", "submit", null);
  cr.ash(path, "enumValues", "load", null);
  regmb(path, "enumValues", false);
});
