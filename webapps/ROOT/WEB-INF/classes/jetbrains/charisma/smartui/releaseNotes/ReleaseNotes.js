cr.setTemplateBind("ReleaseNotes", function (path) {
  cr.ach(path, "titleText", "keypress", function (event, data) {
    if (Webr.util.Key.isKeyNoModifiers(event, Webr.util.Key.ENTER)) {
      cr.findInHandler(event, "" + "." + "titleLinkInlineEditor", ["set"]).submit();
      cr.serverMethodCallInHandler(event, "" + "." + "methodCall_reload", {});
    }

  });
  cr.ash(path, "titleLinkInlineEditor", "createeditor", null);
  cr.ash(path, "titleLinkInlineEditor", "submit", null);
  regic(path, "titleLinkInlineEditor");
});
