Webr.event.PopupMessage = function (config) {
  this.config = config;
  this.visible = false;
};
Webr.event.PopupMessage.prototype.show = function (messageHtml, autoHideDuration) {
  this.createPopup();
  this.message.html(this.getMessage(messageHtml));
  this.popup.fadeIn(this.fadeTicks());
  this.visible = true;
  if (autoHideDuration) {
    var t = this;
    this.autoHideHandle = window.setTimeout(function () {
      t.autoHideHandle = null;
      t.hide();
    }, autoHideDuration);
  }

};
Webr.event.PopupMessage.prototype.getMessage = function (messageHtml) {
  if (messageHtml.indexOf("<li>") == 0) {
    return messageHtml;
  } else {
    return "<li>" + messageHtml + "</li>";
  }

};
Webr.event.PopupMessage.prototype.hide = function () {
  if (this.popup) {
    if (this.autoHideHandle != null) {
      window.clearTimeout(this.autoHideHandle);
      this.autoHideHandle = null;
    }

    this.popup.fadeOut(this.fadeTicks());
    this.visible = false;
  }

  this.fireClosed();
};
Webr.event.PopupMessage.prototype.createPopup = function () {
  if (!this.popup) {
    //Create div
    var html = "<div class=\"" + "message" + " ";
    var config = this.config;
    if (!config.closable) {
      html += "small" + " ";
    }

    if (config.inline) {
      html += "head-message" + " ";
    }

    if (config.styleClass) {
      html += config.styleClass;
    }

    var id = this.getId();
    html += "\" id=\"";
    html += id;
    html += "\">";
    html += "<table><tr><td class=\"" + "err" + "\">!</td><td><ul></ul></td>";
    if (config.closable == true) {
      html += "<td style=\"vertical-align:top;text-align:right\"><a title=\"close\" class=\"close\" href=\"javascript: void(0)\">&times; close</a></td>";
    }

    html += "</tr></table></div>";
    if (!config.inline) {
      $(document.body).append(html);
    } else {
      $(document.body).prepend(html);
    }

    this.popup = $("#" + id);
    this.message = this.popup.find("ul");
    var t = this;
    this.popup.find("a").click(function () {
      t.hide();
    });
  }

};
Webr.event.PopupMessage.prototype.getId = function () {
  Webr.event.PopupMessage.nextId += 1;
  return "__popup__" + Webr.event.PopupMessage.nextId;
};
Webr.event.PopupMessage.prototype.fireClosed = function () {
  if (this.config.onClose) {
    this.config.onClose();
  }

};
Webr.event.PopupMessage.prototype.fadeTicks = function () {
  return this.config.inline ?250 :100;
};
Webr.event.PopupMessage.nextId = 0;
Webr.event.PopupMessage.SYSTEM = new Webr.event.PopupMessage({styleClass: "", closable: true});
Webr.event.PopupMessage.ERROR = new Webr.event.PopupMessage({styleClass: "error", closable: true});
Webr.event.PopupMessage.SMALL_INFO = new Webr.event.PopupMessage({styleClass: ""});
Webr.event.PopupMessage.SMALL_ERROR = new Webr.event.PopupMessage({styleClass: "error"});
Webr.event.PopupMessage.INLINE_SYSTEM = new Webr.event.PopupMessage({styleClass: "", closable: true, inline: true});
Webr.event.PopupMessage.INLINE_ERROR = new Webr.event.PopupMessage({styleClass: "error", closable: true, inline: true});
Webr.event.PopupMessageConfig = function () {
};
