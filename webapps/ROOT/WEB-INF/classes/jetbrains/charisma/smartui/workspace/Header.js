cr.setTemplateBind("Header", function (path) {
  cr.ach(path, "loginLink", "click", function (event, data) {
    cr.serverMethodCallInHandler(event, "" + "." + "methodCall_goToLoginScreen", {__param__location: window.location});
  });
  cr.ach(path, "logoutLink", "click", function (event, data) {
    cr.serverMethodCallInHandler(event, "" + "." + "methodCall_goToLoginScreen", {__param__location: window.location});
  });
  cr.ach(path, "newIssueLink", "click", function (event, data) {
    if (event.ctrlKey === true || (event.which && event.which !== 1)) {
      return true;
    } else {
      charisma.smartui.NewIssueSwitcher.instance.newIssueClick();
      cr.serverMethodCallInHandler(event, "" + "." + "methodCall_newIssueLinkClick", {});
    }

    return false;
  });
  cr.ash(path, "shorcuts", "click", null);
  regmn(path, "userMenu");
  regmn(path, "helpMenu");
});
