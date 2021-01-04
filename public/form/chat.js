import Ws from '@adonisjs/websocket-client'
const ws = Ws()
ws.connect()
ws.on('open', () => {
  let isConnected = true
  console.log('connection successfully established')
})

