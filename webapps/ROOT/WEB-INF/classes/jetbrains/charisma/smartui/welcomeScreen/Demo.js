cr.setTemplateBind("Demo", function (path) {
  cr.ach(path, "close", "click", function (event, data) {
    cr.findInHandler(event, "" + "." + "demoDlg", []).setVisible(false);
  });
  regdlg(path, "demoDlg");
});
