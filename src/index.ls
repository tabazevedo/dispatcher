{filter, each} = require 'prelude-ls'

class Dispatcher
  _callbacks: []

  on: (action, callback) ->
    @_callbacks.push do
      id: @_callbacks.length+1
      action: action
      callback: callback
    @_callbacks.length+1

  clear: (id) ->
    @_callbacks = @_callbacks |> filter (.id is id)

  emit: (action, payload) ->
    @_callbacks |> filter (.action is action) |> each (.callback payload)

module.exports = Dispatcher