cr.setTemplateBind("EditUserGroups", function (path) {
  cr.ash(path, "addUserToGroup", "click", null);
  cr.ash(path, "removeUserFromGroup", "click", null);
});
