cr.setTemplateBind("RegisterUserForm", function (path) {
  cr.ach(path, "register", "click", function (event, data) {
    cr.serverMethodCallInHandler(event, "" + "." + "methodCall_login", {});
  });
  cr.ach(path, "user_fullName", "enter", function (event, data) {
    cr.serverMethodCallInHandler(event, "" + "." + "methodCall_login", {});
  });
  cr.ach(path, "user_login", "enter", function (event, data) {
    cr.serverMethodCallInHandler(event, "" + "." + "methodCall_login", {});
  });
  cr.ach(path, "password", "enter", function (event, data) {
    cr.serverMethodCallInHandler(event, "" + "." + "methodCall_login", {});
  });
  cr.ach(path, "confirmPassword", "enter", function (event, data) {
    cr.serverMethodCallInHandler(event, "" + "." + "methodCall_login", {});
  });
  cr.ach(path, "user_email", "enter", function (event, data) {
    cr.serverMethodCallInHandler(event, "" + "." + "methodCall_login", {});
  });
  cr.forEach(path, "user_fullName", function () {
    this.attachWatcher(false);
  });
  cr.forEach(path, "user_login", function () {
    this.attachWatcher(false);
  });
  cr.forEach(path, "password", function () {
    this.attachWatcher(false);
  });
  cr.forEach(path, "confirmPassword", function () {
    this.attachWatcher(false);
  });
  cr.forEach(path, "user_email", function () {
    this.attachWatcher(false);
  });
});
