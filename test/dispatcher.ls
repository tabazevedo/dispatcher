Dispatcher = require '..'
{strict-equal: eq, ok} = require 'assert'

dispatcher = new Dispatcher

suite 'dispatcher' ->
  test 'subscribe' ->
    ok (typeof dispatcher.on 'action', -> null) is 'number'

  test 'unsubscribe' ->
    ok dispatcher.clear 1

  test 'emit' ->
    pass = false
    dispatcher.on 'action', (payload) -> pass := payload.value
    ok dispatcher.emit 'action', value: true
    ok pass