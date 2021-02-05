const Ws = use('Ws')

const globalMiddleware = []
const namedMiddleware = {}

Ws
  .registerGlobal(globalMiddleware)
  .registerNamed(namedMiddleware)
