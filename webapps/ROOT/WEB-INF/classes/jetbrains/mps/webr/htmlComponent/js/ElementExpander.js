Webr.component.ElementExpander = function () {
};
Webr.component.ElementExpander.addExpandListener = function (elementToExpand, maxHeight, maxWidth) {
  if (maxHeight) {
    elementToExpand.expandMaxHeight = maxHeight;
    $(elementToExpand).keyup(Webr.component.ElementExpander.verticalExpandListener);
    elementToExpand.firstVerticalExpandTimer = window.setInterval(jQuery.proxy(Webr.component.ElementExpander.verticalExpandListener, elementToExpand), 250);
  }

  if (maxWidth) {
    elementToExpand.expandMaxWidth = maxWidth;
    $(elementToExpand).keyup(Webr.component.ElementExpander.horizontalExpandListener);
    elementToExpand.firstHorizontalExpandTimer = window.setInterval(jQuery.proxy(Webr.component.ElementExpander.horizontalExpandListener, elementToExpand), 250);
  }

};
Webr.component.ElementExpander.verticalExpandListener = function () {
  var el = this;
  if (el.offsetHeight > 0) {
    window.clearInterval(el.firstVerticalExpandTimer);
  }

  if (el.offsetHeight < el.expandMaxHeight) {
    el.style.overflowY = "hidden";
    if (el.offsetHeight < el.scrollHeight) {
      el.style.height = (el.scrollHeight + 5) + "px";
    }

  }

  if (el.offsetHeight >= el.expandMaxHeight) {
    el.style.overflowY = "auto";
    el.style.height = el.expandMaxHeight + "px";
  }

  return true;
};
Webr.component.ElementExpander.horizontalExpandListener = function () {
  var el = this;
  if (el.offsetWidth > 0) {
    window.clearInterval(el.firstHorizontalExpandTimer);
  }

  if (el.offsetWidth < el.expandMaxWidth) {
    el.style.overflowX = "hidden";
    if (el.offsetWidth < el.scrollWidth) {
      el.style.width = (el.scrollWidth + 5) + "px";
    }

  }

  if (el.offsetWidth >= el.expandMaxWidth) {
    el.style.overflowX = "auto";
    el.style.width = el.expandMaxWidth + "px";
  }

  return true;
};
