cr.setTemplateBind("IssueAttachmentCommentsDate", function (path) {
  cr.ach(path, "previewAttachedFiles", "mouseover", function (event, data) {
    cr.findInHandler(event, "" + "." + "attachedFilesPopup", []).load(function () {
      cr.serverMethodCallInHandler(event, "" + "." + "methodCall_showPopup", {});
    }, cr.findInHandler(event, "" + "." + "previewAttachedFiles", []));
    return false;
  });
  regPC(path, "attachedFilesPopup");
});
