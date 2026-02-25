charisma.smartui.NewCommandDialogConfig = function () {
  charisma.smartui.NewCommandDialogConfig.superclass.constructor.call(this);
};
{
  var F = new Function();
  F.prototype = charisma.smartui.NewCommandBaseConfig.prototype;
  charisma.smartui.NewCommandDialogConfig.prototype = new F();
  charisma.smartui.NewCommandDialogConfig.prototype.constructor = charisma.smartui.NewCommandDialogConfig;
  charisma.smartui.NewCommandDialogConfig.superclass = charisma.smartui.NewCommandBaseConfig.prototype;
}

charisma.smartui.NewCommandDialogConfig.prototype.updateComment = function () {
};
charisma.smartui.NewCommandDialogConfig.prototype.show = function (issue) {
};
charisma.smartui.NewCommandDialogConfig.prototype.getSelectedIssue = function () {
};
charisma.smartui.NewCommandDialogConfig.prototype.submit = function (focusedIssue, command) {
};
charisma.smartui.NewCommandDialog = function (config) {
  this.catchLetters = true;
  this.modalDiv = null;
  charisma.smartui.NewCommandDialog.superclass.constructor.call(this, config);
  var it = this;
  $(document).keypress(function (e) {
    return it.noFocusElementKeyPressed(e);
  });
  $(document).keydown(function (e) {
    return it.documentKeyDownHandler(e);
  });
  if (charisma.smartui.App.APP) {
    charisma.smartui.App.APP.setNewCommand(this);
  }

  $(config.commentText).bind("valuechange", function () {
    it.serverUpdateComment();
  });
  $(config.commentText).keyrepeatable(function (e) {
    return it.keyhandler(e, true);
  });
  config.commentText.attachWatcher(false);
  charisma.smartui.NewCommandDialog.instance = this;
};
{
  var F = new Function();
  F.prototype = charisma.smartui.NewCommandBase.prototype;
  charisma.smartui.NewCommandDialog.prototype = new F();
  charisma.smartui.NewCommandDialog.prototype.constructor = charisma.smartui.NewCommandDialog;
  charisma.smartui.NewCommandDialog.superclass = charisma.smartui.NewCommandBase.prototype;
}

charisma.smartui.NewCommandDialog.prototype.keyhandler = function (e, comment) {
  if (charisma.smartui.NewCommandDialog.superclass.keyhandler.call(this, e, comment)) {
    if (e.isKey(Webr.util.Key.ESC)) {
      this.hide();
      return false;
    }

  } else {
    return false;
  }

  return true;
};
charisma.smartui.NewCommandDialog.prototype.setCatchLetters = function (enabled) {
  this.catchLetters = enabled;
};
charisma.smartui.NewCommandDialog.prototype.documentKeyDownHandler = function (e) {
  if (this.isVisible()) {
    return true;
  }

  //handle Alt-Ctrl-J
  if (Webr.util.Key.isApplicable(e, SmartUIShortCuts["CommandDialog"])) {
    this.show("");
    if (e.targetIsInput()) {
      this.returnFocus = $(e.target);
    }

    return false;
  }

  if (Webr.util.Key.isApplicable(e, SmartUIShortCuts["AddComment"])) {
    this.show("comment", true);
    return false;
  }

  return true;
};
charisma.smartui.NewCommandDialog.prototype.noFocusElementKeyPressed = function (e) {
  if (e.targetIsInput() || this.isVisible() || !this.catchLetters) {
    return true;
  }

  //handle letters
  if (!(e.altKey || e.ctrlKey || e.metaKey)) {
    var s = this.getCharPressedForKeyPressedEvent(e);
    if (s != null) {
      this.show(s);
      return false;
    }

  }

  return true;
};
charisma.smartui.NewCommandDialog.prototype.getCharPressedForKeyPressedEvent = function (e) {
  var originalEvent = e["originalEvent"];
  var charCode = (originalEvent.which != undefined ?originalEvent.which :originalEvent.keyCode);
  if (charCode > 0 && charCode < 63000) {
    if (charCode >= "0".charCodeAt(0) && charCode <= "9".charCodeAt(0) || charCode >= "A".charCodeAt(0)) {
      return String.fromCharCode(charCode);
    }

  }

  return null;
};
charisma.smartui.NewCommandDialog.prototype.show = function (command, focusToComment) {
  this.returnFocus = null;
  if (!this.config.getSelectedIssue()) {
    return ;
  }

  //send to server
  this.config.show(this.config.getSelectedIssue());
  //other stuff
  this.config.dialog.setVisible(true);
  this.config.commentText.value = "";
  this.config.commandText.value = command;
  this.config.commandText.fireValueChange(command.length, command);
  if (focusToComment == true) {
    this.config.commentText.focus();
  } else {
    this.config.commandText.setCaretPosition(command.length);
    $(this.config.commandText).focus();
  }

};
charisma.smartui.NewCommandDialog.prototype.execute = function (command) {
  if (!this.config.getSelectedIssue()) {
    return ;
  }

  this.config.submit(this.config.getSelectedIssue(), command);
};
charisma.smartui.NewCommandDialog.prototype.serverProcessedShow = function () {
  this.visible = true;
};
charisma.smartui.NewCommandDialog.prototype.setSampleText = function (text) {
  this.config.commandText.focus();
  this.config.commandText.value = text;
  charisma.smartui.InputWatcher.setCaretPosition(this.config.commandText, text.length);
};
charisma.smartui.NewCommandDialog.prototype.hide = function () {
  this.suggest.blur();
  this.config.commandText.blur();
  this.config.commentText.blur();
  this.fire(function (l) {
    l.commandsHide();
  });
  this.config.dialog.setVisible(false);
  this.config.commandText.value = "";
  this.config.commandText.underline("", null);
  this.visible = false;
  if (this.returnFocus) {
    this.returnFocus.focus();
  }

};
charisma.smartui.NewCommandDialog.prototype.serverUpdateComment = function () {
  var t = this;
  this.callOnVisible(function () {
    t.config.updateComment();
  });
};
charisma.smartui.CommandsListener = function () {
  charisma.smartui.CommandsListener.superclass.constructor.call(this);
};
{
  var F = new Function();
  F.prototype = Webr.component.ComponentListener.prototype;
  charisma.smartui.CommandsListener.prototype = new F();
  charisma.smartui.CommandsListener.prototype.constructor = charisma.smartui.CommandsListener;
  charisma.smartui.CommandsListener.superclass = Webr.component.ComponentListener.prototype;
}

charisma.smartui.CommandsListener.prototype.commandsHide = function (source) {
};
