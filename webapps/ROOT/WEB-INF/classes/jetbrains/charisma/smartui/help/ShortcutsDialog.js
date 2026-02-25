cr.setTemplateBind("ShortcutsDialog", function (path) {
  cr.ach(path, "shorcutsDlgClose", "click", function (event, data) {
    cr.findInHandler(event, "" + "." + "shorcutsDlg", []).setVisible(false);
  });
  cr.ach(path, "shorcutsDlg", "keydown", function (event, data) {
    return event.handleEnterEsc(function () {
      return false;
    }, function () {
      cr.findInHandler(event, "" + "." + "shorcutsDlg", []).setVisible(false);
    });
  });
  regdlg(path, "shorcutsDlg");
});
