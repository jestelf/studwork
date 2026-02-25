cr.setTemplateBind("CustomEnumerationsList", function (path) {
  cr.ash(path, "deleteBundle", "click", null);
  cr.ash(path, "editBundle", "click", null);
  cr.ash(path, "addBundleLink", "click", null);
});
