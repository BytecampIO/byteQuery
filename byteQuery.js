;(function() {
  var byteQuery = function(selector) {
    if (!(this instanceof byteQuery)) {
      return new byteQuery(selector);
    }

    if (typeof selector !== 'string') {
      return this;
    }

    var nodes = document.querySelectorAll(selector);
    nodes.forEach(function(value, index) {
      this[index] = value;
    }, this);

    this.length = nodes.length;

    return this;
  }

  byteQuery.prototype.each = function(callback, context) {
    for (var i = 0; i < this.length; i++) {
      callback.call(context || this, this[i], i, this);
    }
    return this;
  }

  byteQuery.prototype.attr = function(attribute, value) {
    if (attribute === 'class') {
      attribute = 'className';
    }

    if (this[0]) {
      if (value) {
        // Setting attribute
        this[0][attribute] = value;
        return this;
      } else {
        // Getting attribute
        return this[0][attribute];
      }
    }
    return undefined;
  }

  byteQuery.prototype.on = function(eventName, callback) {
    this.each(function(target) {
      target.addEventListener(eventName, callback, false);
    });
    return this;
  }

  byteQuery.prototype.off = function(eventName, callback) {
    this.each(function(target) {
      target.removeEventListener(eventName, callback, false);
    });
    return this;
  }

  window.byteQuery = byteQuery;
  window.$ = byteQuery;
})()
