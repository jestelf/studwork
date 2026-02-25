cr.setTemplateBind("User", function (path) {
  cr.ach(path, "deleteUser", "click", function (event, data) {
    if (window.confirm("Are you sure?")) {
      cr.serverMethodCallInHandler(event, "" + "." + "methodCall_delete", {__param__u: cr.getTarget(event).getAttribute("p0")});
    }

  });
  cr.ach(path, "testJabberLink", "click", function (event, data) {
    var jt = cr.findInHandler(event, "" + "." + "jabberText", []);
    jt.unHighlight();
    if (jt.value == "") {
      jt.highlight("Required");
      jt.focus();
    } else {
      cr.serverMethodCallInHandler(event, "" + "." + "methodCall_checkJabber", {__param__jabberAccountName: jt.value});
    }

  });
  cr.ach(path, "testEmailLink", "click", function (event, data) {
    var et = cr.findInHandler(event, "" + "." + "emailText", []);
    et.unHighlight();
    if (et.value == "") {
      et.highlight("Required");
      et.focus();
    } else {
      cr.serverMethodCallInHandler(event, "" + "." + "methodCall_checkEmail", {__param__email: et.value});
    }

  });
  cr.ach(path, "enableEmailNotifications", "click", function (event, data) {
    if (cr.findInHandler(event, "" + "." + "enableEmailNotifications", []).checked) {
      $(cr.findInHandler(event, "" + "." + "formatSetting", [])).removeClass("hidden");
    } else {
      $(cr.findInHandler(event, "" + "." + "formatSetting", [])).addClass("hidden");
    }

  });
  cr.ash(path, "cancelButton", "click", null);
  cr.ash(path, "saveButton", "click", null);
  cr.ash(path, "enablePlainTextEmailsOld", "click", null);
  cr.ash(path, "changePassword", "click", null);
  cr.ash(path, "notifyOnIssueNoticedCheckbox", "click", null);
  cr.ash(path, "notifyOnOwnCheckbox", "click", null);
  cr.ash(path, "profileTabs", "tabactivate", null);
  cr.ash(path, "enableEmailNotifications", "click", null);
  cr.ash(path, "enableJabberNotifications", "click", null);
  cr.ash(path, "ban", "click", null);
  cr.ash(path, "watchCommentsAndVotesOnly", "click", null);
  cr.ash(path, "avatar" + "." + "uploadFile2", "click", null);
  cr.ash(path, "avatar" + "." + "uploadFile", "click", null);
  cr.ash(path, "enablePlainTextEmailsOld", "Load", {collectFormElements: false, hideLoadingPopup: true, processRecentOnly: true});
  regCC(path, "enablePlainTextEmailsOld");
  regtab(path, "profileTabs");
});
