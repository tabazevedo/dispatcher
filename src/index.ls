{filter, each, last} = require 'prelude-ls'

class Dispatcher
  _callbacks: []

  on: (action, callback) ->
    @_callbacks.push do
      id: if prev = @_callbacks |> last then prev.id + 1 else 1
      action: action
      callback: callback
    (@_callbacks |> last).id

  clear: (which) ->
    if typeof which is 'number' 
      @_callbacks = @_callbacks |> filter (.id is which)
    else
      which |> each (~> @clear it)

  emit: (action, payload) ->
    @_callbacks
      |> each (->
        if it.action == action
          it.callback payload
        else if it.action instanceof RegExp && it.action.test action
          it.callback payload <<< { matches: action.match it.action })

module.exports = Dispatcher