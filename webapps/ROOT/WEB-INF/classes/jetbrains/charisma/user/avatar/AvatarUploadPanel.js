cr.setTemplateBind("AvatarUploadPanel", function (path) {
  cr.ash(path, "avatarFileInput", "change", {collectFileElements: true});
});
