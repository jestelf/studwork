cr.setTemplateBind("AttachmentThumbnail", function (path) {
  cr.ach(path, "preview", "mouseover", function (event, data) {
    cr.findInHandler(event, "" + "." + "previewPopup", []).load(function () {
      cr.serverMethodCallInHandler(event, "" + "." + "methodCall_showPreview", {});
    }, cr.findInHandler(event, "" + "." + "preview", []));
    return false;
  });
  regPC(path, "previewPopup");
});
