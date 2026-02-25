cr.setTemplateBind("WatchFoldersSideBar", function (path) {
  cr.ach(path, "watchFolderSideBarTitleDiv", "click", function (event, data) {
    cr.serverMethodCallInHandler(event, "" + "." + "methodCall_toggle", {});
    return false;
  });
  cr.ash(path, "toggleShowAll", "click", null);
});
