Dispatcher = require '..'
{strict-equal: eq, ok} = require 'assert'

dispatcher = Dispatcher!

suite 'dispatcher' ->
  test 'subscribe' ->
    ok (typeof dispatcher.on 'action', -> null) is 'number'
    ok (dispatcher.on 'action', -> null) is 2
    ok (dispatcher.on 'action', -> null) is 3
    ok (dispatcher.on 'action', -> null) is 4
    ok (dispatcher.on 'action', -> null) is 5

  test 'unsubscribe' ->
    ok dispatcher.clear 1
    ok dispatcher.clear [1, 2, 3, 4, 5]
    ok dispatcher.clear!

  test 'emit' ->
    pass = false
    ok dispatcher.on 'action', (payload) -> pass := payload.value
    ok dispatcher.emit 'action', value: true
    ok pass

  test 'regex' ->
    pass = false
    ok dispatcher.on /^action:(.*)$/, (payload) -> pass := payload.value
    ok dispatcher.emit 'action:test', value: true
    ok pass