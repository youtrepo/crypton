'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class NotificationsSchema extends Schema {
  up () {
    this.create('notifications', (table) => {
      table.increments()
      table.string('email',255)
      table.text('msg','longtext')
      table.string('type',50)
      table.string('status',50)
      table.string('trade_link',565)
      table.timestamps()
    })
  }

  down () {
    this.drop('notifications')
  }
}

module.exports = NotificationsSchema
