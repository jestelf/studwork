cr.setTemplateBind("CustomFieldsList", function (path) {
  cr.ash(path, "deleteField", "click", null);
  cr.ash(path, "addCustomFieldLink", "click", null);
  cr.ash(path, "editField", "click", null);
});
