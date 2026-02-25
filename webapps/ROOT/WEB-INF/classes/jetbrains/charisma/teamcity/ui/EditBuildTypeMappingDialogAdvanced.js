cr.setTemplateBind("EditBuildTypeMappingDialogAdvanced", function (path) {
  cr.ash(path, "accessRestricted", "click", null);
  cr.ash(path, "groups", "load", null);
  regmb(path, "groups", false);
});
