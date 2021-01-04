'use strict'

class ChatController {
  async chat({request,response,view}){
    return view.render('dashboard/chat')

  }
}

module.exports = ChatController
