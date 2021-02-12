'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ChatsSchema extends Schema {
  up () {
    this.create('chats', (table) => {
      table.increments()
      table.string('trade_id')
      table.text('messages','longtext')
      table.string('user',255)
      table.string('type',55)
      table.timestamps()
    })
  }

  down () {
    this.drop('chats')
  }
}

module.exports = ChatsSchema
