cr.setTemplateBind("AddScreenshotDialog", function (path) {
  cr.ach(path, "cancel", "click", function (event, data) {
    //todo: call this.hide() instead to stop applet
    cr.findInHandler(event, "" + "." + "addScreenshotDialog", []).setVisible(false);
  });
  cr.ach(path, "quickTime", "click", function (event, data) {
    Webr.event.PopupMessage.ERROR.show("To use this functionality on Mac you have to install <a href='http://developer.apple.com/quicktime/qtjava/'>QuickTime for Java</a>.");
    cr.findInHandler(event, "" + "." + "addScreenshotDialog", []).setVisible(false);
  });
  cr.ach(path, "afterSubmit", "click", function (event, data) {
    Webr.event.PopupMessage.SYSTEM.show("Image is attached", 2000);
    cr.findInHandler(event, "" + "." + "addScreenshotDialog", []).setVisible(false);
  });
  cr.ach(path, "cantPaste", "click", function (event, data) {
    Webr.event.PopupMessage.ERROR.show("Sorry, cannot paste the image", 2000);
    cr.findInHandler(event, "" + "." + "addScreenshotDialog", []).setVisible(false);
  });
  cr.ach(path, "cantAttach", "click", function (event, data) {
    Webr.event.PopupMessage.ERROR.show("Sorry, cannot attach the image", 2000);
    cr.findInHandler(event, "" + "." + "addScreenshotDialog", []).setVisible(false);
  });
  cr.ach(path, "cantScreenshot", "click", function (event, data) {
    Webr.event.PopupMessage.ERROR.show("Sorry, cannot capture screenshot", 2000);
    cr.findInHandler(event, "" + "." + "addScreenshotDialog", []).setVisible(false);
  });
  cr.ach(path, "noImageInClipboard", "click", function (event, data) {
    Webr.event.PopupMessage.ERROR.show("There is no image in clipboard", 2000);
    cr.findInHandler(event, "" + "." + "addScreenshotDialog", []).setVisible(false);
  });
  cr.ach(path, "cancelLoading", "click", function (event, data) {
    cr.findInHandler(event, "" + "." + "addScreenshotDialog", []).setVisible(false);
  });
  cr.ach(path, "reload", "click", function (event, data) {
    Webr.Event.reload();
  });
  cr.ash(path, "afterSubmit", "click", null);
  cr.ash(path, "install", "click", null);
  regdlg(path, "addScreenshotDialog");
});
