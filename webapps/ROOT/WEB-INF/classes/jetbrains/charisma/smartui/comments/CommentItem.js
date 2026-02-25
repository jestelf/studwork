charisma.smartui.CommentItem = function (list, element) {
  this.commentsList = list;
  var query = $(element);
  this.element = query.get(0);
  var it = this;
  query.click(function (e) {
    if (!Webr.util.Util.targetIsInput(e)) {
      it.commentsList.mousedown(it);
    }

    return true;
  });
};
charisma.smartui.CommentItem.prototype.collect = function () {
  time("collect comment elements");
  var query = $(this.element);
  this.permaLink = query.find("a.permalink");
  this.editComment = query.find("a.comment-edit").get(0);
  this.deleteComment = query.find("a.comment-delete").get(0);
  timeEnd("collect comment elements");
};
charisma.smartui.CommentItem.prototype.edit = function () {
  if (this.editComment) {
    $(this.editComment).click();
  }

};
charisma.smartui.CommentItem.prototype.del = function () {
  if (this.deleteComment) {
    $(this.deleteComment).click();
  }

};
charisma.smartui.CommentItem.prototype.refresh = function () {
  this.collect();
  this.select();
};
charisma.smartui.CommentItem.prototype.select = function (noFocus, noScroll) {
  this.addClass(this.commentsList.selectedItemClass);
  if (!noFocus) {
    this.permaLink.focus();
  }

  if (!noScroll) {
    $(this.element).scrollTo(this.commentsList.scrollable ?this.commentsList.mainDivElement :undefined);
  }

};
charisma.smartui.CommentItem.prototype.unselect = function () {
  this.removeClass(this.commentsList.selectedItemClass);
};
charisma.smartui.CommentItem.prototype.addClass = function (cls) {
  $(this.element).addClass(cls);
};
charisma.smartui.CommentItem.prototype.removeClass = function (cls) {
  $(this.element).removeClass(cls);
};
