jQuery.prototype.scrollTo = function (container, hScroll) {
  var it = this.get(0);
  var elementHeight = container ?this.height() :this.outerHeight(true);
  var bounds = [$(container ?container :window).scrollLeft(), $(container ?container :window).scrollTop(), $(container ?container :window).width(), $(container ?container :window).height()];
  var moveX = 0;
  var moveY = 0;
  if (hScroll) {
    var elementWidth = container ?this.width() :this.outerWidth(true);
    var offsetLeft = container ?it.offsetLeft :this.offset().left;
    var diffX = offsetLeft + elementWidth - bounds[0] - bounds[2];
    if (diffX > 0) {
      moveX = bounds[2] < elementWidth ?offsetLeft - bounds[0] :diffX;
    } else {
      moveX = bounds[0] > offsetLeft ?offsetLeft - bounds[0] :moveX;
    }

  }

  var offsetTop = container ?it.offsetTop :this.offset().top;
  var diffY = offsetTop + elementHeight - bounds[1] - bounds[3];
  if (diffY > 0) {
    moveY = bounds[3] < elementHeight ?offsetTop - bounds[1] :diffY;
  } else {
    moveY = bounds[1] > offsetTop ?offsetTop - bounds[1] :moveY;
  }

  $(container ?container :window).scrollLeft(bounds[0] + moveX);
  $(container ?container :window).scrollTop(bounds[1] + moveY);
  return this;
};
jQuery.prototype.maxVisibleHeight = function () {
  var it = this.get(0);
  var top = $(it).offset().top;
  var edge = $(window).height() + $(window).scrollTop();
  var res = Math.min(this.height(), Math.max(0, edge - top));
  return res;
};
jQuery.prototype.ancestorOf = function (expr, reflective) {
  var a = $(expr);
  if (this.length != 1 || a.length != 1) {
    throw "More then one element or empty element.";
  }

  var child = a.get(0);
  var parent = this.get(0);
  if (reflective && child == parent) {
    return true;
  }

  if (parent["contains"] && !Webr.util.Util.isWebkit) {
    return parent["contains"](child);
  } else {
    var _parent = child.parentNode;
    while (_parent) {
      if (_parent == parent) {
        return true;
      }

      if (!_parent.tagName || parent.tagName.toLowerCase() == "html") {
        return false;
      }

      _parent = _parent.parentNode;
    }

    return false;
  }

};
jQuery.prototype.relativeOffset = function () {
  var top = 0;
  var left = 0;
  var jqOffset = this.offset();
  var elem = this.parent();
  while (elem[0] && elem[0] !== document.body && elem[0] !== this[0].ownerDocument.documentElement) {
    if (elem.css("position") == "relative") {
      top = elem[0].offsetTop;
      left = elem[0].offsetLeft;
            break;

    }

    elem = elem.parent();
  }

  jqOffset.top = top > 0 ?top :jqOffset.top;
  jqOffset.left = left > 0 ?left :jqOffset.left;
  return jqOffset;
};
jQuery.prototype.keyrepeatable = function (handler) {
  if (Webr.util.Util.isIE || Webr.util.Util.isWebkit) {
    this.keydown(handler);
  } else {
    this.keypress(handler);
  }

};
jQuery.prototype.toggleClass = function (name) {
  if (this.hasClass(name)) {
    this.removeClass(name);
  } else {
    this.addClass(name);
  }

};
jQuery.prototype.setVisible = function (visible) {
  if (visible) {
    this.show();
  } else {
    this.hide();
  }

};
jQuery.prototype.matches = function (tags) {
  for (var i = 0; i < tags.length; i += 1) {
    if (this.is(tags[i].toLowerCase())) {
      return true;
    }

  }

  return false;
};
jQuery.prototype.equals = function (element) {
  var el = element.length > 0 ?element.get(0) :element;
  return this.get(0) === el;
};
