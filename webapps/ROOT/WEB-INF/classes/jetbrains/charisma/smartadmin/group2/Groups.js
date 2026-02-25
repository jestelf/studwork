cr.setTemplateBind("Groups", function (path) {
  cr.ash(path, "addUserToGroup", "click", null);
  cr.ash(path, "autoJoin", "click", null);
  regtt(path, "autoJoinToolTip", false);
});
