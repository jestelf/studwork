cr.setTemplateBind("SelectAllIssues", function (path) {
  cr.ash(path, "selectAllIssues", "click", null);
  cr.ash(path, "clearAllIssuesSelection", "click", null);
});
