cr.setTemplateBind("StatusLine", function (path) {
  cr.ach(path, "supposeClose", "click", function (event, data) {
    $(cr.findInHandler(event, "" + "." + "supposeResults", [])).addClass("hidden");
  });
  cr.ach(path, "showReleaseNotes", "click", function (event, data) {
    return false;
  });
  cr.ash(path, "showReleaseNotes", "click", null);
});
