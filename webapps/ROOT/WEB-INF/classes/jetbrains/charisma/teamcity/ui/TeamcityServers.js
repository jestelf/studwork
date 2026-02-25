cr.setTemplateBind("TeamcityServers", function (path) {
  cr.ach(path, "remove", "click", function (event, data) {
    if (window.confirm("All associated build mappings and issue-related changes will be deleted. Continue?")) {
      cr.serverMethodCallInHandler(event, "" + "." + "methodCall_delete", {__param__ts: cr.getTarget(event).getAttribute("p0")});
    }

  });
  cr.ash(path, "addServer", "click", null);
  cr.ash(path, "edit", "click", null);
});
