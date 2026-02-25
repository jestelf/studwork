cr.setTemplateBind("ProjectBuilds", function (path) {
  cr.ach(path, "delete", "click", function (event, data) {
    if (window.confirm("Are you sure?")) {
      cr.serverMethodCallInHandler(event, "" + "." + "methodCall_delete", {__param__v: cr.getTarget(event).getAttribute("p0")});
    }

  });
  cr.ash(path, "createNewBuild", "click", null);
  cr.ash(path, "createNewBuilds2", "click", null);
  cr.ash(path, "edit", "click", null);
});
