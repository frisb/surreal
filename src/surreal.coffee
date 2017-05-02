((factory) ->
  if (typeof(define) is 'function' && define.amd)
    define -> factory()
  else if (typeof(module) isnt 'undefined' && typeof(module.exports) isnt 'undefined')
    module.exports = factory()

  return)(->
    class Surreal
      constructor: ->
        @BaseSerializer = Surreal

      __serialize: (obj, space) ->
        replacer = (key, val) ->
          return val.toString() if typeof val is 'function'
          return val

        JSON.stringify(obj, replacer, space)

      __deserialize: (str) ->
        reviver = (key, val) ->
          if (val && typeof val is 'string' && val.substr(0, 8) is 'function')
            argsBegin = val.indexOf('(') + 1
            argsEnd = val.indexOf(')')

            bodyBegin = val.indexOf('{') + 1
            bodyEnd = val.lastIndexOf('}')

            return new Function(val.substring(argsBegin, argsEnd), val.substring(bodyBegin, bodyEnd))

          return val

        JSON.parse(str, reviver)

      serialize: (obj, space) -> @__serialize(obj, space)
      deserialize: (str) -> @__deserialize(str)

    new Surreal())
