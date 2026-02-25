cr.setTemplateBind("EditProjectCustomFields", function (path) {
  cr.ash(path, "edit", "click", null);
  cr.ash(path, "addFirstCustomField", "click", null);
  cr.ash(path, "addCustomField", "click", null);
  cr.ash(path, "remove", "click", null);
});
