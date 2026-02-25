Webr.util.Set = function () {
  this._size = 0;
  this.numberField = "_KEY_IN_SET_" + Webr.util.Set.instanceCount;
  Webr.util.Set.instanceCount += 1;
};
Webr.util.Set.prototype.add = function (item) {
  if (item == null) {
    throw "Can't add undefined item.";
  }

  if (!this.items) {
    this.items = {};
    this._key = 0;
  }

  if (this.contains(item)) {
    //Already in set!
    return ;
  }

  this.items[this._key] = item;
  item[this.numberField] = this._key;
  this._key += 1;
  this._size += 1;
};
Webr.util.Set.prototype.remove = function (item) {
  if (item[this.numberField] == null) {
    throw "Item [" + item + "] not from this set.";
  }

  delete this.items[item[this.numberField]];
  delete item[this.numberField];
  this._size -= 1;
};
Webr.util.Set.prototype.contains = function (item) {
  return item[this.numberField];
};
Webr.util.Set.prototype.size = function () {
  return this._size;
};
Webr.util.Set.prototype.forEach = function (f) {
  for ( var key in this.items) {
    if (!f(this.items[key])) {
      return false;
    }

  }

  return true;
};
Webr.util.Set.instanceCount = 0;
