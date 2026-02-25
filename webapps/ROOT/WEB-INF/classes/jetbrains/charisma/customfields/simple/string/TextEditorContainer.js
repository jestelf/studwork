cr.setTemplateBind("TextEditorContainer", function (path) {
  cr.ach(path, "te" + "." + "textContentInlineEditor", "createeditor", function (event, data) {
    $(cr.findInHandler(event, "" + "." + "textEditorContainer", [])).addClass("cf-edit");
  });
  cr.ach(path, "te" + "." + "textContentInlineEditor", "abort", function (event, data) {
    $(cr.findInHandler(event, "" + "." + "textEditorContainer", [])).removeClass("cf-edit");
  });
  cr.ach(path, "te" + "." + "textContentInlineEditor", "submit", function (event, data) {
    $(cr.findInHandler(event, "" + "." + "textEditorContainer", [])).removeClass("cf-edit");
  });
});
