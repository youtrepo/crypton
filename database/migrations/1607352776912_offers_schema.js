'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OffersSchema extends Schema {
  up () {
    this.create('offers', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('offers')
  }
}

module.exports = OffersSchema
