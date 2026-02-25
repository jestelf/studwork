cr.setTemplateBind("WelcomeContent", function (path) {
  cr.ash(path, "welcomeTab", "tabactivate", null);
  cr.ash(path, "wh" + "." + "Hint1" + "." + "demo1", "click", null);
  cr.ash(path, "wh" + "." + "Hint2" + "." + "demo2", "click", null);
  cr.ash(path, "wh" + "." + "Hint4" + "." + "demo4", "click", null);
  cr.ash(path, "wh" + "." + "Hint3" + "." + "demo3", "click", null);
  regtab(path, "welcomeTab");
});
