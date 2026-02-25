cr.setTemplateBind("EditGroupRoles", function (path) {
  cr.ach(path, "UserRole" + "." + "unassignRole", "click", function (event, data) {
    if (window.confirm("Are you sure?")) {
      cr.serverMethodCallInHandler(event, "" + "." + "methodCall_unassignRole", {__param__ur: cr.getTarget(event).getAttribute("p0")});
    }

  });
  cr.ash(path, "UserRole" + "." + "editRole", "click", null);
  cr.ash(path, "addRoleToGroup", "click", null);
});
