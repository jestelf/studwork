charisma.LoginFormUtil = function () {
  this.onInitListeners = [];
};
charisma.LoginFormUtil.prototype.addInitListener = function (f) {
  this.onInitListeners.push(f);
};
charisma.LoginFormUtil.prototype.enableLoginInput = function () {
  this.loginInput.disabled = false;
  this.loginInput.title = null;
};
charisma.LoginFormUtil.prototype.enablePasswordInput = function () {
  this.passwordInput.disabled = false;
  this.passwordInput.title = null;
};
charisma.LoginFormUtil.prototype.disableLoginInput = function () {
  this.loginInput.disabled = true;
  this.loginInput.title = "Click 'less OpenID' first to enter login.";
};
charisma.LoginFormUtil.prototype.disablePasswordInput = function () {
  this.passwordInput.disabled = true;
  this.passwordInput.title = "Click 'less OpenID' first to enter password.";
};
charisma.LoginFormUtil.prototype.fireOnInit = function () {
  for (var i = 0; i < this.onInitListeners.length; i += 1) {
    this.onInitListeners[i]();
  }

  this.onInitListeners = [];
};
charisma.LoginFormUtil.INSTANCE = null;
charisma.LoginFormUtil.getInstance = function () {
  if (charisma.LoginFormUtil.INSTANCE == null) {
    charisma.LoginFormUtil.INSTANCE = new charisma.LoginFormUtil();
  }

  return charisma.LoginFormUtil.INSTANCE;
};
