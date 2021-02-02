'use strict'

const { Command } = require('@adonisjs/ace')

class Scheduler extends Command {
  static get signature () {
    return 'scheduler'
  }

  static get description () {
    return 'Tell something helpful about this command'
  }

  async handle (args, options) {
    this.info('Dummy implementation for scheduler command')
  }
}

module.exports = Scheduler
