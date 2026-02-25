cr.setTemplateBind("CreateProject", function (path) {
  cr.ash(path, "EditProjectMain" + "." + "saveProject", "click", null);
  cr.ash(path, "EditProjectMain" + "." + "cancelProject", "click", null);
});
