cr.setTemplateBind("LoginForm", function (path) {
  cr.ach(path, "login", "enter", function (event, data) {
    //Timeout is required for browser password autocompletion, without timeout 
    // empty password may be sent
    window.setTimeout(function () {
      cr.serverMethodCallInHandler(event, "" + "." + "methodCall_login", {__param__login: cr.findInHandler(event, "" + "." + "login", []).value, __param__password: cr.findInHandler(event, "" + "." + "password", []).value, __param__asGuest: false}, {preventDoubleSubmit: true});
    }, 50);
    return false;
  });
  cr.ach(path, "login", "valuechange", function (event, data) {
    Webr.ErrorMessage.clearErrorMessages();
    Webr.ErrorMessage.closePopup();
  });
  cr.ach(path, "password", "valuechange", function (event, data) {
    Webr.ErrorMessage.clearErrorMessages();
    Webr.ErrorMessage.closePopup();
  });
  cr.ach(path, "password", "enter", function (event, data) {
    cr.serverMethodCallInHandler(event, "" + "." + "methodCall_login", {__param__login: cr.findInHandler(event, "" + "." + "login", []).value, __param__password: cr.findInHandler(event, "" + "." + "password", []).value, __param__asGuest: false});
    return false;
  });
  cr.ach(path, "loginButton", "click", function (event, data) {
    if (Webr.util.PageStateStore.getInstance().get("mode") == "openid") {
      cr.serverMethodCallInHandler(event, "" + "." + "openIdLoginForm" + "." + "methodCall_startAuthorisation", {});
    } else {
      cr.serverMethodCallInHandler(event, "" + "." + "methodCall_login", {__param__login: cr.findInHandler(event, "" + "." + "login", []).value, __param__password: cr.findInHandler(event, "" + "." + "password", []).value, __param__asGuest: false}, {preventDoubleSubmit: true});
    }

    return false;
  });
  cr.ach(path, "loginAsGuestLink", "click", function (event, data) {
    cr.serverMethodCallInHandler(event, "" + "." + "methodCall_login", {__param__login: "guest", __param__password: "", __param__asGuest: true}, {preventDoubleSubmit: true});
    return false;
  });
  cr.ach(path, "loginForm", "submit", function (event, data) {
    var loginForm = cr.findInHandler(event, "" + "." + "loginForm", []);
    if (loginForm.loginComplete) {
      return true;
    } else {
      cr.serverMethodCallInHandler(event, "" + "." + "methodCall_login", {__param__login: cr.findInHandler(event, "" + "." + "login", []).value, __param__password: cr.findInHandler(event, "" + "." + "password", []).value, __param__asGuest: false}, {preventDoubleSubmit: true});
      return false;
    }

  });
  cr.ach(path, "login", "focus", function (event, data) {
    cr.findInHandler(event, "" + "." + "login", []).select();
  });
  cr.ach(path, "password", "focus", function (event, data) {
    cr.findInHandler(event, "" + "." + "password", []).select();
  });
  cr.ash(path, "sendPasswordLink", "click", {sync: true});
  cr.forEach(path, "login", function () {
    this.attachWatcher(false);
  });
  cr.forEach(path, "password", function () {
    this.attachWatcher(false);
  });
  cr.forEach(path, "login", function () {
    this.attachWatcher(false);
  });
  cr.forEach(path, "password", function () {
    this.attachWatcher(false);
  });
});
