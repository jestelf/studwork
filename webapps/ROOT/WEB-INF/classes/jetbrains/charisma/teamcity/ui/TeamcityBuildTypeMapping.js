cr.setTemplateBind("TeamcityBuildTypeMapping", function (path) {
  cr.ach(path, "deleteMapping", "click", function (event, data) {
    if (window.confirm("Do you really want to delete this mapping?")) {
      cr.serverMethodCallInHandler(event, "" + "." + "methodCall_delete", {__param__m: cr.getTarget(event).getAttribute("p0")});
    }

  });
  cr.ash(path, "editMapping", "click", null);
  cr.ash(path, "manualStart", "click", null);
  cr.ash(path, "resetKnownBuild", "click", null);
});
