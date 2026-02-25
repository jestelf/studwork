cr.setTemplateBind("AppLogoPanel", function (path) {
  cr.ash(path, "logoFileInput", "change", {collectFileElements: true});
});
