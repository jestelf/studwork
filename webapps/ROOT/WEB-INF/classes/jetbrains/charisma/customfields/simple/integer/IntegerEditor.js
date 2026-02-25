cr.setTemplateBind("IntegerEditor", function (path) {
  cr.ach(path, "intValue", "keydown", function (event, data) {
    return event.handleEnterEsc(function () {
      var value = parseInt(cr.findInHandler(event, "" + "." + "intValue", []).value);
      if (isNaN(value) || value > 2097152 * 1024 - 1 || value < -2097152 * 1024 + 1) {
        cr.findInHandler(event, "" + "." + "intValue", []).highlight(null, null, true);
        Webr.event.PopupMessage.SMALL_ERROR.show("Integer value expected!", 3000);
      } else {
        cr.findInHandler(event, "" + "." + "intValue", []).value = value;
        cr.findInHandler(event, "" + "." + "integerContentInlineEditor", []).submit();
      }

    }, function () {
      cr.findInHandler(event, "" + "." + "integerContentInlineEditor", []).abort();
    });
  });
  cr.ach(path, "clearValue", "click", function (event, data) {
    //Prevent bubbling
    return false;
  });
  cr.ash(path, "clearValue", "click", null);
  cr.ash(path, "integerContentInlineEditor", "createeditor", {preventDoubleSubmit: true});
  cr.ash(path, "integerContentInlineEditor", "submit", {preventDoubleSubmit: true});
  regic(path, "integerContentInlineEditor");
});
