cr.setTemplateBind("CommandsToolbarPart", function (path) {
  cr.ach(path, "commandItem", "click", function (event, data) {
    if (!charisma.smartui.App.APP || charisma.smartui.App.getSelectedIssueId() != null) {
      charisma.smartui.NewCommandDialog.instance.show(cr.getTarget(event).getAttribute("p0"), cr.getTarget(event).getAttribute("p0").indexOf("comment") >= 0);
    } else {
      Webr.event.PopupMessage.ERROR.show("No selected issue", 2000);
    }

  });
  cr.ach(path, "commandItemInstant", "click", function (event, data) {
    if (!charisma.smartui.App.APP || charisma.smartui.App.getSelectedIssueId() != null) {
      charisma.smartui.NewCommandDialog.instance.execute(cr.getTarget(event).getAttribute("p0"));
    } else {
      Webr.event.PopupMessage.ERROR.show("No selected issue", 2000);
    }

  });
  cr.ach(path, "fileItem", "click", function (event, data) {
    if (!charisma.smartui.App.APP || charisma.smartui.App.getSelectedIssueId() != null) {
      cr.serverMethodCallInHandler(event, "" + "." + "methodCall_addFileActionCall", {__param__i: charisma.smartui.App.getSelectedIssueId(), __param__action: cr.getTarget(event).getAttribute("p0")});
    } else {
      Webr.event.PopupMessage.ERROR.show("No selected issue", 2000);
    }

  });
  regmn(path, "resolveMenu");
  regmn(path, "assignMenu");
  regmn(path, "addLinkMenu");
  regmn(path, "addFileMenu");
});
