cr.setTemplateBind("LinkedIssue", function (path) {
  cr.ash(path, "vi" + "." + "collapse", "click", null);
  cr.ash(path, "vi" + "." + "ip" + "." + "iacd" + "." + "ct" + "." + "toggleCommentsDiv", "click", null);
});
