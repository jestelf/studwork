cr.setTemplateBind("Roles", function (path) {
  cr.ach(path, "deleteRole", "click", function (event, data) {
    if (window.confirm("Are you sure?")) {
      cr.serverMethodCallInHandler(event, "" + "." + "methodCall_delete", {__param__r: cr.getTarget(event).getAttribute("p0")});
    }

  });
});
