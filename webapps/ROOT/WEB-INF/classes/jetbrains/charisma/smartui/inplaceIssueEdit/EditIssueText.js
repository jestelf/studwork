cr.setTemplateBind("EditIssueText", function (path) {
  cr.ash(path, "project", "Load", {collectFormElements: false, hideLoadingPopup: true, processRecentOnly: true});
  regCC(path, "project");
  cr.forEach(path, "description", function () {
    Webr.component.ElementExpander.addExpandListener(this, 400);
  });
});
