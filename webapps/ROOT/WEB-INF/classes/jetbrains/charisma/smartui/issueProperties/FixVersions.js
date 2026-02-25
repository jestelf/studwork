cr.setTemplateBind("FixVersions", function (path) {
  cr.ach(path, "issueFixedInVersion", "ShowOptions", function (event, data) {
    $(cr.findInHandler(event, "" + "." + "issueFixInVersionLink", [])).addClass("active");
  });
  cr.ach(path, "issueFixedInVersion", "HideOptions", function (event, data) {
    $(cr.findInHandler(event, "" + "." + "issueFixInVersionLink", [])).removeClass("active");
    if (!(cr.findInHandler(event, "" + "." + "issueFixedInVersion", []).submitted)) {
      cr.findInHandler(event, "" + "." + "issueFixedInVersion", []).reset();
    }

  });
  cr.ash(path, "issueFixedInVersion", "submit", null);
  cr.ash(path, "issueFixedInVersion", "load", null);
  regmb(path, "issueFixedInVersion", false);
});
