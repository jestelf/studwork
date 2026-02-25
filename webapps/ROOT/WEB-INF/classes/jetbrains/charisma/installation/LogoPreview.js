cr.setTemplateBind("LogoPreview", function (path) {
  cr.ash(path, "uploadFile", "click", null);
  cr.ash(path, "removeLogo", "click", null);
  cr.ash(path, "cald" + "." + "submit", "click", null);
});
