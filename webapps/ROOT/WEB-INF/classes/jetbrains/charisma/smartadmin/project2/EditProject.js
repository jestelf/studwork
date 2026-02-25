cr.setTemplateBind("EditProject", function (path) {
  cr.ach(path, "deleteCurrentProject", "click", function (event, data) {
    if (window.confirm("Are you sure?")) {
      if (window.confirm("Really?")) {
        cr.serverMethodCallInHandler(event, "" + "." + "methodCall_delete", {__param__p: cr.getTarget(event).getAttribute("p0")});
      }

    }

  });
  cr.ach(path, "EditProjectSaveDialog" + "." + "editProjectSaveOk", "click", function (event, data) {
    cr.serverMethodCallInHandler(event, "" + "." + "methodCall_save", {});
    cr.serverMethodCallInHandler(event, "" + "." + "EditProjectSaveDialog" + "." + "methodCall_hideDlg", {});
  });
  cr.ach(path, "EditProjectSaveDialog" + "." + "editProjectSaveCancel", "click", function (event, data) {
    cr.serverMethodCallInHandler(event, "" + "." + "methodCall_cancel", {});
    cr.serverMethodCallInHandler(event, "" + "." + "EditProjectSaveDialog" + "." + "methodCall_hideDlg", {});
  });
  cr.ach(path, "EditProjectSaveDialog", "keydown", function (event, data) {
    return e.handleEnterEsc(function () {
      cr.serverMethodCallInHandler(event, "" + "." + "methodCall_save", {});
    }, function () {
      cr.serverMethodCallInHandler(event, "" + "." + "methodCall_cancel", {});
    });
  });
  cr.ash(path, "editProject", "tabdeactivate", null);
  cr.ash(path, "EditProjectMain" + "." + "saveProject", "click", null);
  cr.ash(path, "EditProjectMain" + "." + "cancelProject", "click", null);
  regtab(path, "editProject");
});
