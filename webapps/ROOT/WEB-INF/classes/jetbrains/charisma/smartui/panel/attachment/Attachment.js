cr.setTemplateBind("Attachment", function (path) {
  cr.ach(path, "deleteAttachment", "click", function (event, data) {
    if (window.confirm("Are you sure?")) {
      cr.serverMethodCallInHandler(event, "" + "." + "methodCall_deleteAttachment", {});
    }

  });
  cr.ash(path, "editAttachment", "click", null);
});
