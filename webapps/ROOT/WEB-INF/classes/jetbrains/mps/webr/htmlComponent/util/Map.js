Webr.util.Map = function () {
  this._size = 0;
  Webr.util.Map.instances += 1;
};
Webr.util.Map.prototype.put = function (key, item) {
  if (key == null) {
    throw "Can't add item with undefined key.";
  }

  if (!this._items) {
    this._items = {};
  }

  this._items[key] = item;
  this._size += 1;
};
Webr.util.Map.prototype.remove = function (key) {
  if (this._items && this._items[key]) {
    delete this._items[key];
    this._size -= 1;
  }

};
Webr.util.Map.prototype.get = function (key) {
  if (this._items && this._items[key]) {
    return this._items[key];
  }

  return null;
};
Webr.util.Map.prototype.getKeys = function () {
  return this._items;
};
Webr.util.Map.prototype.forEach = function (f) {
  if (this._size > 0) {
    for ( var key in this._items) {
      f(key, this._items[key]);
    }

  }

};
Webr.util.Map.instances = 0;
