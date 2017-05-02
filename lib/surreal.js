(function() {
  (function(factory) {
    if (typeof define === 'function' && define.amd) {
      define(function() {
        return factory();
      });
    } else if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
      module.exports = factory();
    }
  })(function() {
    var Surreal;
    Surreal = (function() {
      function Surreal() {
        this.BaseSerializer = Surreal;
      }

      Surreal.prototype.__serialize = function(obj, space) {
        var replacer;
        replacer = function(key, val) {
          if (typeof val === 'function') {
            return val.toString();
          }
          return val;
        };
        return JSON.stringify(obj, replacer, space);
      };

      Surreal.prototype.__deserialize = function(str) {
        var reviver;
        reviver = function(key, val) {
          var argsBegin, argsEnd, bodyBegin, bodyEnd;
          if (val && typeof val === 'string' && val.substr(0, 8) === 'function') {
            argsBegin = val.indexOf('(') + 1;
            argsEnd = val.indexOf(')');
            bodyBegin = val.indexOf('{') + 1;
            bodyEnd = val.lastIndexOf('}');
            return new Function(val.substring(argsBegin, argsEnd), val.substring(bodyBegin, bodyEnd));
          }
          return val;
        };
        return JSON.parse(str, reviver);
      };

      Surreal.prototype.serialize = function(obj, space) {
        return this.__serialize(obj, space);
      };

      Surreal.prototype.deserialize = function(str) {
        return this.__deserialize(str);
      };

      return Surreal;

    })();
    return new Surreal();
  });

}).call(this);
