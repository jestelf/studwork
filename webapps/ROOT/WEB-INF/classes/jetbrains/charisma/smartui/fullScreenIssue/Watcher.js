cr.setTemplateBind("Watcher", function (path) {
  cr.ash(path, "user", "mouseover", null);
  regPC(path, "watchersListPopup");
});
