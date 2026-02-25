charisma.smartui.Filter = function (ul) {
  this.options = $(ul).find("li input:checkbox").filter(function (index) {
    return index > 0;
  });
};
charisma.smartui.Filter.getFilter = function (filterLi) {
  var filterUl = filterLi.parentNode.parentNode;
  var fieldName = "searchFilterComponent";
  var filter = filterUl[fieldName];
  if (filter == null) {
    filter = new charisma.smartui.Filter(filterUl);
    filterUl[fieldName] = filter;
  }

  return filter;
};
