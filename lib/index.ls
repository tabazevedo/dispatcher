{filter, each, last, map} = require 'prelude-ls'

module.exports = ->
  id: 1
  callbacks: []

  on: (action, callback) ->
    @callbacks.push do
      id: @id
      action: action
      callback: callback
    @id +:= 1

  clear: (which=false) ->
    if typeof which is 'number' 
      @callbacks = @callbacks |> filter (.id is which)
    else if which instanceof Array
      which |> each (~> @clear it)
    else if !which
      @callbacks |> map (.id) |> each (~> @clear it)

  emit: (action, payload) ->
    @callbacks
      |> each (->
        if it.action is action
          it.callback payload
        else if typeof it.action is 'function' && it.action action
          it.callback payload
        else if it.action instanceof RegExp && it.action.test action
          it.callback payload <<< { matches: action.match it.action })