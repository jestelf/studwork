cr.setTemplateBind("WatchFolderNotifications", function (path) {
  cr.ash(path, "all", "click", null);
  cr.ash(path, "notify", "click", null);
});
