cr.setTemplateBind("IntegerEditorContainer", function (path) {
  cr.ach(path, "te" + "." + "integerContentInlineEditor", "createeditor", function (event, data) {
    $(cr.findInHandler(event, "" + "." + "intField", [])).addClass("cf-edit");
  });
  cr.ach(path, "te" + "." + "integerContentInlineEditor", "abort", function (event, data) {
    $(cr.findInHandler(event, "" + "." + "intField", [])).removeClass("cf-edit");
  });
  cr.ach(path, "te" + "." + "integerContentInlineEditor", "submit", function (event, data) {
    $(cr.findInHandler(event, "" + "." + "intField", [])).removeClass("cf-edit");
  });
});
