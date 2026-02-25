cr.setTemplateBind("TryWikiPopup", function (path) {
  cr.ash(path, "clearSandboxLink", "click", null);
  cr.ash(path, "textEditor", "valuechange", {preventDoubleSubmit: true});
  regdlg(path, "TryWikiPopup");
  cr.forEach(path, "textEditor", function () {
    this.attachWatcher(false);
  });
});
