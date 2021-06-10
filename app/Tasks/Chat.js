'use strict'

const Task = use('Task')
const trade=use('App/Models/Trade')

class Chat extends Task {
  static get schedule () {
    return '0 */1 * * * *'
  }

  async handle () {
    //this.info('Task Chat handle')
    //console.log('started tasks')

  }
}

module.exports = Chat
