const Server = use('Server')
const Ws = use('socket.io')(Server.getInstance())

module.exports=Ws

