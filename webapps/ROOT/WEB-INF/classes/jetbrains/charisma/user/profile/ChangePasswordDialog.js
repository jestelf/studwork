cr.setTemplateBind("ChangePasswordDialog", function (path) {
  cr.ach(path, "passOk", "click", function (event, data) {
    unhighlight(event);
    cr.serverMethodCallInHandler(event, "" + "." + "methodCall_updateNewPassword", {});
  });
  cr.ach(path, "newPassword2", "enter", function (event, data) {
    unhighlight(event);
    cr.serverMethodCallInHandler(event, "" + "." + "methodCall_updateNewPassword", {});
  });
  cr.ach(path, "closeChangePasswordDlg", "click", function (event, data) {
    reset(event);
    cr.findInHandler(event, "" + "." + "changePasswordDlg", []).setVisible(false);
  });
  cr.ach(path, "passCancel", "click", function (event, data) {
    reset(event);
    cr.findInHandler(event, "" + "." + "changePasswordDlg", []).setVisible(false);
  });
  cr.ach(path, "oldPassword", "esc", function (event, data) {
    reset(event);
    cr.findInHandler(event, "" + "." + "changePasswordDlg", []).setVisible(false);
  });
  cr.ach(path, "newPassword1", "esc", function (event, data) {
    reset(event);
    cr.findInHandler(event, "" + "." + "changePasswordDlg", []).setVisible(false);
  });
  cr.ach(path, "newPassword2", "esc", function (event, data) {
    reset(event);
    cr.findInHandler(event, "" + "." + "changePasswordDlg", []).setVisible(false);
  });
  cr.ash(path, "restorePassword", "click", null);
  regdlg(path, "changePasswordDlg");
  cr.forEach(path, "oldPassword", function () {
    this.attachWatcher(false);
  });
  cr.forEach(path, "newPassword2", function () {
    this.attachWatcher(false);
  });
  cr.forEach(path, "newPassword1", function () {
    this.attachWatcher(false);
  });
  cr.forEach(path, "newPassword2", function () {
    this.attachWatcher(false);
  });
});
var reset = function () {
  //Cheats!
  if (cr.findInHandler(event, "" + "." + "oldPassword", [])) {
    cr.findInHandler(event, "" + "." + "oldPassword", []).value = "";
  }

  cr.findInHandler(event, "" + "." + "newPassword1", []).value = "";
  cr.findInHandler(event, "" + "." + "newPassword2", []).value = "";
  unhighlight(event);
};


var unhighlight = function (event) {
  if (cr.findInHandler(event, "" + "." + "oldPassword", [])) {
    cr.findInHandler(event, "" + "." + "oldPassword", []).unHighlight();
  }

  cr.findInHandler(event, "" + "." + "newPassword1", []).unHighlight();
  cr.findInHandler(event, "" + "." + "newPassword2", []).unHighlight();
};
