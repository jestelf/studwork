Webr.component.InlineEditor = function (span, presentation, presentationId, editorId) {
  var t = this;
  t.editing = false;
  t.presentation = presentation;
  t.presentationId = presentationId;
  t.editorId = editorId;
  t.span = span;
  span.data(Webr.component.ComponentRegistry.COMPONENT_INSTANCE, t);
  t.outSideClickHandler = function (e) {
    if (!t.editor.ancestorOf(e.target, true)) {
      t.abort();
    }

  };
  t.keyHandler = function (e) {
    t.keypress(e);
  };
  t.presentation.click(function () {
    t.click();
  });
};
Webr.component.InlineEditor.prototype.addHandlers = function (e) {
  Webr.util.Util.addKeyHandler(e, this.keyHandler);
  $(document).mousedown(this.outSideClickHandler);
};
Webr.component.InlineEditor.prototype.removeHandlers = function (e) {
  Webr.util.Util.removeKeyHandler(e, this.keyHandler);
  $(document).unbind("mousedown", this.outSideClickHandler);
};
Webr.component.InlineEditor.prototype.click = function () {
  if (!this.editing) {
    this.span.trigger("createeditor");
  }

};
Webr.component.InlineEditor.prototype.keypress = function (e) {
  if (this.editing) {
    if (e.isKey(Webr.util.Key.ESC)) {
      this.abort();
      return false;
    }

  }

  return true;
};
Webr.component.InlineEditor.prototype.abort = function () {
  if (this.editing) {
    this.span.trigger("abort");
    this.revertEditor(this.editor.get(0));
    this.removeHandlers(this.editor);
    this.editor.hide();
    this.presentation.show();
    this.presentation.focus();
    this.editing = false;
  }

};
Webr.component.InlineEditor.prototype.submit = function () {
  this.removeHandlers(this.editor);
  this.span.trigger("submit");
};
Webr.component.InlineEditor.prototype.setEditor = function (innerHtml) {
  if (!this.editing) {
    this.originalText = innerHtml;
    var t = this;
    t.presentation.hide();
    var e;
    if (this.editor) {
      e = t.editor.get(0);
    } else {
      e = document.createElement("div");
      t.presentation.after($(e));
    }

    this.updateEditor(e, innerHtml);
    this.addHandlers(this.editor);
    this.editing = true;
    this.editor.show();
    this.editor.focus();
  }

};
Webr.component.InlineEditor.prototype.updateEditor = function (element, innerHtml) {
  $(element).replaceWith(innerHtml);
  var editor = $(document.getElementById(this.editorId));
  cr.bindHandlers(editor.parent().get(0));
  this.editor = editor;
};
Webr.component.InlineEditor.prototype.revertEditor = function (e) {
  this.editor = $(e).replaceWith(this.originalText);
  this.editor = $(document.getElementById(this.editorId));
};
Webr.component.InlineEditor.prototype.setPresentation = function (innerHtml) {
  if (this.editing) {
    var t = this;
    t.editor.hide();
    Webr.event.RefreshCommandProcessor.setContent(t.presentation.get(0), innerHtml);
    var presentation = $(document.getElementById(t.presentationId));
    cr.bindHandlers(presentation.parent().get(0));
    t.presentation = presentation;
    t.presentation.click(function () {
      t.click();
    });
    t.editing = false;
    t.presentation.show();
    t.presentation.focus();
  }

};
Webr.component.InlineEditor.prototype.oncreateeditor = function () {
};
Webr.component.InlineEditor.prototype.onsubmit = function () {
};
Webr.component.InlineEditor.prototype.onabort = function () {
};
Webr.component.InlineEditor.register2 = function (path, spanSuffixName) {
  cr.forEach(path, spanSuffixName, function () {
    var span = $(this);
    var presentationId = span.attr("pid");
    var editorId = span.attr("eid");
    var presentation = $(document.getElementById(presentationId));
    presentation.one("click", function () {
      var inline = new Webr.component.InlineEditor(span, presentation, presentationId, editorId);
      inline.click();
    });
  });
};
var regic = Webr.component.InlineEditor.register2;
