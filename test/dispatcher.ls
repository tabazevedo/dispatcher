dispatcher = require '..'
{strict-equal: eq, ok} = require 'assert'

suite 'library' ->
  test 'version' ->
    eq dispatcher.VERSION, (require '../package.json').version

# suite 'emit' ->
# suite 'subscribe' ->
# suite 'unsubscribe' ->