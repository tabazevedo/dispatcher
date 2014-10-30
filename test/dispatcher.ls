dispatcher-js = require '..'
{strict-equal: eq, ok} = require 'assert'

dispatcher = new dispatcher-js.Dispatcher

suite 'dispatcher' ->
  test 'subscribe' ->
    ok (typeof dispatcher.sub 'action', -> null) is 'Number'

  test 'unsubscribe' ->
    ok dispatcher.unsub 1

  test 'emit' ->
    pass = false
    dispatcher.sub 'action', -> pass = true
    ok dispatcher.emit 'action'
    ok pass