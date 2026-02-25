cr.setTemplateBind("SelectGroupsDialog", function (path) {
  cr.ach(path, "selectGroupsDlg", "keydown", function (event, data) {
    return event.handleEnterEsc(function () {
      cr.serverMethodCallInHandler(event, "" + "." + "methodCall_save", {});
    }, function () {
      cr.serverMethodCallInHandler(event, "" + "." + "methodCall_cancel", {});
    });
  });
  cr.ach(path, "selectGroupsDlg", "historychanged", function (event, data) {
    cr.serverMethodCallInHandler(event, "" + "." + "methodCall_cancel", {});
  });
  cr.ach(path, "selectGroupCancel", "click", function (event, data) {
    cr.findInHandler(event, "" + "." + "selectGroupsDlg", []).setVisible(false);
  });
  cr.ach(path, "closeSelectGroupsDlg", "click", function (event, data) {
    cr.serverMethodCallInHandler(event, "" + "." + "methodCall_cancel", {});
  });
  cr.ash(path, "selectGroupOk", "click", null);
  cr.ash(path, "selectGroupMulti", "load", null);
  regmb(path, "selectGroupMulti", false);
  regdlg(path, "selectGroupsDlg");
});
