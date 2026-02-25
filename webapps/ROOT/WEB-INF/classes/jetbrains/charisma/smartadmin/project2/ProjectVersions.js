cr.setTemplateBind("ProjectVersions", function (path) {
  cr.ach(path, "delete", "click", function (event, data) {
    if (window.confirm("Are you sure?")) {
      cr.serverMethodCallInHandler(event, "" + "." + "methodCall_delete", {__param__v: cr.getTarget(event).getAttribute("p0")});
    }

  });
  cr.ash(path, "edit", "click", null);
  cr.ash(path, "versionArchived", "click", null);
  cr.ash(path, "versionReleased", "click", null);
  cr.ash(path, "moveUp", "click", null);
  cr.ash(path, "moveDown", "click", null);
  cr.ash(path, "createNewVersion", "click", null);
  cr.ash(path, "showReleasedVer", "click", null);
  cr.ash(path, "createNewVersion2", "click", null);
});
