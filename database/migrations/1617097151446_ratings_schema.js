'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RatingsSchema extends Schema {
  up () {
    this.create('ratings', (table) => {
      table.increments()
      table.string('username')
      table.string('ratings')
      table.text('feedback','longtext')
      table.timestamps()
    })
  }

  down () {
    this.drop('ratings')
  }
}

module.exports = RatingsSchema
