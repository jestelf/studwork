cr.setTemplateBind("FiltersSideBar", function (path) {
  cr.ach(path, "filtersSideBarTitleDiv", "click", function (event, data) {
    cr.serverMethodCallInHandler(event, "" + "." + "methodCall_toggle", {});
    return false;
  });
  cr.ach(path, "close", "click", function (event, data) {
    cr.findInHandler(event, "" + "." + "filterResults", []).hide();
  });
  regPC(path, "filterResults");
});
