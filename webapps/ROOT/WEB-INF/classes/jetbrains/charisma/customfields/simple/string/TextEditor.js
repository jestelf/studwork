cr.setTemplateBind("TextEditor", function (path) {
  cr.ach(path, "textValue", "keydown", function (event, data) {
    return event.handleEnterEsc(function () {
      cr.findInHandler(event, "" + "." + "textContentInlineEditor", []).submit();
    }, function () {
      cr.findInHandler(event, "" + "." + "textContentInlineEditor", []).abort();
    });
  });
  cr.ash(path, "textContentInlineEditor", "createeditor", {preventDoubleSubmit: true});
  cr.ash(path, "textContentInlineEditor", "submit", {preventDoubleSubmit: true});
  regic(path, "textContentInlineEditor");
});
