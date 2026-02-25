charisma.smartui.TextSelector = function () {
};
charisma.smartui.TextSelector.SELECTED_NOTHIG = 0;
charisma.smartui.TextSelector.SELECTED_FIRST = 1;
charisma.smartui.TextSelector.SELECTED_FIRST_AND_SECOND = 2;
charisma.smartui.TextSelector.state = charisma.smartui.TextSelector.SELECTED_NOTHIG;
charisma.smartui.TextSelector.clearTextSelection = function () {
  charisma.smartui.TextSelector.state = charisma.smartui.TextSelector.SELECTED_NOTHIG;
  try {
    if (Webr.util.Util.isIE) {
      document.selection.empty();
    } else {
      window.getSelection().removeAllRanges();
    }

  } catch (error) {
  }

};
charisma.smartui.TextSelector.setSelection = function (element) {
  var range = Webr.util.Util.isIE ?document.body.createTextRange() :document.createRange();
  var sel = Webr.util.Util.isIE ?document.selection :window.getSelection();
  if (Webr.util.Util.isIE) {
    range.moveToElementText(element);
    if (charisma.smartui.TextSelector.state != charisma.smartui.TextSelector.SELECTED_FIRST) {
      range.select();
    } else {
      var s = sel.createRange();
      s.setEndPoint("EndToEnd", range);
      s.select();
    }

  } else {
    if (charisma.smartui.TextSelector.state != charisma.smartui.TextSelector.SELECTED_FIRST) {
      range.selectNodeContents(element);
    } else {
      range.setStartBefore(sel.focusNode);
      range.setEndAfter(element);
    }

    sel.removeAllRanges();
    sel.addRange(range);
  }

};
charisma.smartui.TextSelector.selectText = function (el, el2) {
  var item;
  var n;
  switch (charisma.smartui.TextSelector.state) {
  case charisma.smartui.TextSelector.SELECTED_NOTHIG:
    item = el;
    n = charisma.smartui.TextSelector.SELECTED_FIRST;
        break;

  case charisma.smartui.TextSelector.SELECTED_FIRST:
    item = el2;
    n = charisma.smartui.TextSelector.SELECTED_FIRST_AND_SECOND;
        break;

  case charisma.smartui.TextSelector.SELECTED_FIRST_AND_SECOND:
    charisma.smartui.TextSelector.clearTextSelection();
    item == null;
        break;

  }

  if (item != null && charisma.smartui.TextSelector.state != charisma.smartui.TextSelector.SELECTED_FIRST_AND_SECOND) {
    charisma.smartui.TextSelector.setSelection(item);
  } else {
    n = charisma.smartui.TextSelector.SELECTED_NOTHIG;
  }

  charisma.smartui.TextSelector.state = n;
};
