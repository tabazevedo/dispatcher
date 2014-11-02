Dispatcher = require '..'
{strict-equal: eq, ok} = require 'assert'

nil = -> null
setup -> @dispatcher = Dispatcher!

suite 'subscribing to dispatcher' ->
  test 'subscribe' ->
    ok (@dispatcher.on 'action', nil) is 1

  test 'incremental ids' ->
    ok (@dispatcher.on 'action', nil) is 1
    ok (@dispatcher.on 'action', nil) is 2
    @dispatcher.clear 2
    ok (@dispatcher.on 'action', nil) is 3

suite 'unsubscribing from dispatcher' ->
  test 'single' ->
    @dispatcher.on 'action', nil
    @dispatcher.clear 1
    eq @dispatcher.callbacks.length, 0

  test 'multiple' ->
    @dispatcher.on 'action', nil
    @dispatcher.on 'action', nil
    @dispatcher.clear [1, 2]
    eq @dispatcher.callbacks.length, 0

  test 'all' ->
    @dispatcher.on 'action', nil
    @dispatcher.on 'action', nil
    @dispatcher.on 'action', nil
    @dispatcher.on 'action', nil
    @dispatcher.clear!
    eq @dispatcher.callbacks.length, 0

suite 'firing events' ->
  test 'matching a string' ->
    pass = false
    ok @dispatcher.on 'action', (payload) -> pass := payload.value
    ok @dispatcher.emit 'action', value: true
    ok pass

  test 'matching an expression' ->
    pass = false
    ok @dispatcher.on /^action:(.*)$/, (payload) -> pass := payload.value
    ok @dispatcher.emit 'action:test', value: true
    ok pass