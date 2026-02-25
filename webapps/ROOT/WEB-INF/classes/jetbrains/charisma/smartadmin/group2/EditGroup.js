cr.setTemplateBind("EditGroup", function (path) {
  cr.ach(path, "deleteGroup", "click", function (event, data) {
    if (window.confirm("Are you sure?")) {
      cr.serverMethodCallInHandler(event, "" + "." + "methodCall_delete", {__param__ug: cr.getTarget(event).getAttribute("p0")});
    }

  });
  cr.ash(path, "EditGroupMain" + "." + "saveGroup", "click", null);
  cr.ash(path, "EditGroupMain" + "." + "cancelGroup", "click", null);
  cr.ash(path, "editGroupTabs", "tabactivate", null);
  regtab(path, "editGroupTabs");
});
