cr.setTemplateBind("EnumerationBundleDialog", function (path) {
  cr.ash(path, "close", "click", null);
  cr.ash(path, "cancel", "click", null);
  cr.ash(path, "submit", "click", null);
  cr.ash(path, "addEnumValue", "click", null);
  regdlg(path, "dialog");
});
