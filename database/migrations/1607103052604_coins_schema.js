'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CoinsSchema extends Schema {
  up () {
    this.create('coins', (table) => {
      table.increments()
      table.string('coin',265).unique()
      table.timestamps()
    })
  }

  down () {
    this.drop('coins')
  }
}

module.exports = CoinsSchema
