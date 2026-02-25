charisma.smartui.CommentsList = function (config) {
  charisma.smartui.CommentsList.superclass.constructor.call(this);
  this.scrollable = false;
  this.commentItems = [];
  this.commentItemMap = {};
  this.selected = -1;
  this.focused = false;
  this.newCommentTextAreaFocused = false;
  var element = config.contentDiv;
  this.content = element;
  this.mainDivElement = $(element).children("div." + "commentsScroll").get(0);
  this.selectedItemClass = config.selectedItemClass;
  this.mouseoverItemClass = config.mouseOverItemClass;
  this.scrollable = config.scrollable;
  this.init();
};
{
  var F = new Function();
  F.prototype = Webr.component.Component.prototype;
  charisma.smartui.CommentsList.prototype = new F();
  charisma.smartui.CommentsList.prototype.constructor = charisma.smartui.CommentsList;
  charisma.smartui.CommentsList.superclass = Webr.component.Component.prototype;
}

charisma.smartui.CommentsList.prototype.init = function () {
  var it = this;
  var content = $(this.content);
  this.keyHandler = function (event) {
    return it.keyhandler(event);
  };
  this.mouseHandler = function (event) {
    if (!content.ancestorOf(event.target)) {
      it.unhandleKeys();
    }

  };
  this.refreshList();
  var commentId = Webr.util.PageStateStore.getInstance().get("comment");
  if (commentId) {
    this.selectAndScroll(commentId);
  }

  this.newCommentTexArea = content.find("." + "addComment" + " :input").get(0);
  if (this.newCommentTexArea) {
    var textAreaQuery = $(this.newCommentTexArea);
    textAreaQuery.focus(function () {
      it.focusOnTextArea();
    });
    textAreaQuery.blur(function () {
      it.unFocusOnTextArea();
    });
  }

};
charisma.smartui.CommentsList.prototype.handleKeys = function () {
  if (!this.focused) {
    this.focused = true;
    var doc = Webr.util.Util.isIE ?document.body :document;
    $(doc).mousedown(this.mouseHandler);
    Webr.util.Util.addKeyHandler(doc, this.keyHandler);
  }

};
charisma.smartui.CommentsList.prototype.unhandleKeys = function () {
  if (this.focused) {
    this.focused = false;
    var doc = Webr.util.Util.isIE ?document.body :document;
    $(doc).unbind("mousedown", this.mouseHandler);
    Webr.util.Util.removeKeyHandler(doc, this.keyHandler);
  }

};
charisma.smartui.CommentsList.prototype.refreshList = function () {
  var it = this;
  $(this.content).find("table." + "tableComments" + " > tbody").children().each(function () {
    it.addOrUpdate(this);
  });
};
charisma.smartui.CommentsList.prototype.addOrUpdate = function (selector) {
  var query = $(selector);
  var tr = selector;
  if (!tr) {
    throw "Can't find div for selector [" + selector + "]";
  }

  var id = query.attr("_id");
  var comment = this.commentItemMap[id];
  if (comment == null) {
    comment = new charisma.smartui.CommentItem(this, selector);
    this.commentItems.push(comment);
    this.commentItemMap[id] = comment;
  }

  comment.collect();
  return comment;
};
charisma.smartui.CommentsList.prototype.keyhandler = function (event) {
  if (this.newCommentTextAreaFocused) {
    switch (event.keyCode) {
    case Webr.util.Key.ESC:
      return this.throwToUp(event);
    case Webr.util.Key.UP:
      if (this.prevInsideInput()) {
        return true;
      } else {
        if (!this.empty()) {
          this.prev();
          $(this.newCommentTexArea).blur();
          return false;
        }

      }

      return this.throwToUp(event);
    case Webr.util.Key.DOWN:
      return this.nextInsideInput() ?true :this.throwToUp(event);
    case Webr.util.Key.LEFT:
      return this.prevInsideInput() ?true :this.throwToUp(event);
    }

    return true;
  }

  if (Webr.util.Util.targetIsInput(event)) {
    return true;
  }

  switch (event.keyCode) {
  case Webr.util.Key.UP:
    return this.prev() ?false :this.throwToUp(event);
  case Webr.util.Key.DOWN:
    return this.next() ?false :this.throwToUp(event);
  case Webr.util.Key.RIGHT:
    return false;
  case Webr.util.Key.PAGEUP:
    this.first();
    return false;
  case Webr.util.Key.PAGEDOWN:
    this.last();
    return false;
  }

  if (event.isKey(Webr.util.Key.F2)) {
    this.getSelected().edit();
    return false;
  }

  if (event.isKey(Webr.util.Key.DELETE)) {
    this.getSelected().del();
    return false;
  }

  if (event.isKey(Webr.util.Key.ENTER)) {
    return true;
  }

  return this.throwToUp(event);
};
charisma.smartui.CommentsList.prototype.throwToUp = function (event) {
  var keyDown = this.fireKeyDown(event);
  if (!keyDown) {
    if (this.newCommentTextAreaFocused) {
      this.newCommentTexArea.blur();
    }

    this.unhandleKeys();
  }

  return keyDown;
};
charisma.smartui.CommentsList.prototype.isFocused = function () {
  return this.focused;
};
charisma.smartui.CommentsList.prototype.empty = function () {
  return this.commentItems.length <= 0;
};
charisma.smartui.CommentsList.prototype.size = function () {
  return this.commentItems.length;
};
charisma.smartui.CommentsList.prototype.focusOnTextArea = function () {
  this.handleKeys();
  if (this.getSelected()) {
    this.getSelected().unselect();
    this.selected = -1;
  }

  this.newCommentTextAreaFocused = true;
};
charisma.smartui.CommentsList.prototype.unFocusOnTextArea = function () {
  this.newCommentTextAreaFocused = false;
};
charisma.smartui.CommentsList.prototype.focus = function () {
  var it = this;
  this.handleKeys();
  if (this.getSelected()) {
    this.getSelected().select();
  } else {
    //TimeOuts is setted for not loosing focus bact to IssueListItem
    if (!this.empty()) {
      window.setTimeout(function () {
        it.selected = it.size() - 1;
        it.getSelected().select();
      }, 35);
    } else {
      window.setTimeout(function () {
        it.newCommentTexArea.focus();
      }, 35);
    }

  }

};
charisma.smartui.CommentsList.prototype.unfocus = function () {
  this.unhandleKeys();
};
charisma.smartui.CommentsList.prototype.clearSelection = function () {
  if (this.getSelected()) {
    this.getSelected().unselect();
    this.selected = -1;
  }

};
charisma.smartui.CommentsList.prototype.mousedown = function (item) {
  this.handleKeys();
  if (this.getSelected() === item) {
    item.select(true, true);
  } else {
    this.clearSelection();
    this.setSelected(item);
    item.select(true);
  }

};
charisma.smartui.CommentsList.prototype.selectAndScroll = function (commentId) {
  var item = this.commentItemMap[commentId];
  if (item) {
    this.handleKeys();
    this.clearSelection();
    this.setSelected(item);
    item.select(false, true);
    $(window).scrollTop($(item.element).offset().top);
  }

};
charisma.smartui.CommentsList.prototype.next = function () {
  if (this.getSelected() && this.selected < this.size() - 1) {
    this.getSelected().unselect();
    this.selected += 1;
    this.getSelected().select();
    return true;
  } else {
    if (this.getSelected() && this.selected == this.size() - 1 && this.newCommentTexArea) {
      this.getSelected().unselect();
      this.selected = -1;
      $(this.newCommentTexArea).focus();
      return true;
    }

  }

  return false;
};
charisma.smartui.CommentsList.prototype.prev = function () {
  if (this.getSelected() && this.selected > 0) {
    this.getSelected().unselect();
    this.selected -= 1;
    this.getSelected().select();
    return true;
  } else {
    if (this.newCommentTextAreaFocused && !this.empty()) {
      this.selected = this.size() - 1;
      this.getSelected().select();
      return true;
    }

  }

  return false;
};
charisma.smartui.CommentsList.prototype.last = function () {
  if (this.getSelected() && this.selected < this.size() - 1) {
    this.getSelected().unselect();
    this.selected = this.size() - 1;
    this.getSelected().select();
  }

};
charisma.smartui.CommentsList.prototype.first = function () {
  if (this.getSelected() && this.selected > 0) {
    this.getSelected().unselect();
    this.selected = 0;
    this.getSelected().select();
  }

};
charisma.smartui.CommentsList.prototype.nextInsideInput = function () {
  if (this.newCommentTexArea.value.length <= 0) {
    return false;
  }

  return true;
};
charisma.smartui.CommentsList.prototype.prevInsideInput = function () {
  if (this.newCommentTexArea.value.length <= 0) {
    return false;
  }

  return true;
};
charisma.smartui.CommentsList.prototype.getSelected = function () {
  if (this.empty() || this.selected == -1 || this.selected >= this.size()) {
    return null;
  }

  return this.commentItems[this.selected];
};
charisma.smartui.CommentsList.prototype.setSelected = function (item) {
  this.selected = jQuery.inArray(item, this.commentItems);
};
charisma.smartui.CommentsListConfig = function () {
};
charisma.smartui.CommentsListConfig.prototype.toggleEdit = function (id) {
};
