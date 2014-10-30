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
    @_callbacks |> filter (.action is action) |> each (.callback payload)

module.exports = Dispatcher