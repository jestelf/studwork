cr.setTemplateBind("AffectedVersions", function (path) {
  cr.ach(path, "issueAffectsVersion", "ShowOptions", function (event, data) {
    $(cr.findInHandler(event, "" + "." + "issueAffectsVersionLink", [])).addClass("active");
  });
  cr.ach(path, "issueAffectsVersion", "HideOptions", function (event, data) {
    $(cr.findInHandler(event, "" + "." + "issueAffectsVersionLink", [])).removeClass("active");
    if (!(cr.findInHandler(event, "" + "." + "issueAffectsVersion", []).submitted)) {
      cr.findInHandler(event, "" + "." + "issueAffectsVersion", []).reset();
    }

  });
  cr.ash(path, "issueAffectsVersion", "submit", null);
  cr.ash(path, "issueAffectsVersion", "load", null);
  regmb(path, "issueAffectsVersion", false);
});
