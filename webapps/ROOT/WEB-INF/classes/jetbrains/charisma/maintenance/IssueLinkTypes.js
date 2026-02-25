cr.setTemplateBind("IssueLinkTypes", function (path) {
  cr.ash(path, "removeLink", "click", null);
  cr.ash(path, "editLink", "click", null);
  cr.ash(path, "createNewIssueLinkType", "click", null);
  cr.ash(path, "createNewIssueLinkType2", "click", null);
});
