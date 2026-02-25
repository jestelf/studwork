Webr.component.ClassToggler = function () {
};
Webr.component.ClassToggler.addRemoveClassOnOutClickHandler = function (element, classToRemove) {
  window.setTimeout(function () {
    var f = function (event) {
      for (var target = event.target; target != null; target = target.parentNode) {
        if (target == element) {
          return true;
        }

      }

      $(element).removeClass(classToRemove);
      $(document).unbind("click", f);
    };
    $(document).click(f);
  }, 20);
};
Webr.component.ClassToggler.toggleClass = function (targetElementId, toggleClass, outClickClassRemove) {
  var element = document.getElementById(targetElementId);
  if (!($(element).hasClass(toggleClass))) {
    $(element).addClass(toggleClass);
    if (outClickClassRemove) {
      Webr.component.ClassToggler.addRemoveClassOnOutClickHandler(element, toggleClass);
    }

  } else {
    $(element).removeClass(toggleClass);
  }

};
Webr.component.ClassToggler.bind = function (linkId, targetElementId, toggleClass, outClickClassRemove, beforeToggle, afterToggle) {
  $(document.getElementById(linkId)).click(function () {
    if (beforeToggle) {
      beforeToggle();
    }

    Webr.component.ClassToggler.toggleClass(targetElementId, toggleClass, outClickClassRemove);
    if (afterToggle) {
      afterToggle();
    }

  });
  if (outClickClassRemove) {
    var element = document.getElementById(targetElementId);
    if (element && $(element).hasClass(toggleClass)) {
      Webr.component.ClassToggler.addRemoveClassOnOutClickHandler(element, toggleClass);
    }

  }

};
