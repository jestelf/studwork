cr.setTemplateBind("OpenIdLoginForm", function (path) {
  cr.ach(path, "moreOpenIdLink", "click", function (event, data) {
    var u = charisma.LoginFormUtil.getInstance();
    Webr.util.PageStateStore.getInstance().put("mode", "openid");
    $(cr.findInHandler(event, "" + "." + "lessOpenId", [])).addClass("hidden");
    u.disableLoginInput();
    u.disablePasswordInput();
    $(cr.findInHandler(event, "" + "." + "moreOpenId", [])).removeClass("hidden");
    cr.findInHandler(event, "" + "." + "openId", []).focus();
  });
  cr.ach(path, "lessOpenIdLink", "click", function (event, data) {
    var u = charisma.LoginFormUtil.getInstance();
    Webr.util.PageStateStore.getInstance().removeKey("mode");
    $(cr.findInHandler(event, "" + "." + "moreOpenId", [])).addClass("hidden");
    u.enableLoginInput();
    u.enablePasswordInput();
    $(cr.findInHandler(event, "" + "." + "lessOpenId", [])).removeClass("hidden");
    u.loginInput.focus();
  });
  cr.ach(path, "openId_v1", "click", function (event, data) {
    cr.findInHandler(event, "" + "." + "openId", []).value = cr.findInHandler(event, "" + "." + "openId_v1_URL", [cr.getTarget(event).getAttribute("p0")]).value;
  });
  cr.ach(path, "openId", "focus", function (event, data) {
    cr.findInHandler(event, "" + "." + "openId", []).select();
  });
  cr.ash(path, "openId_v2", "click", null);
});
