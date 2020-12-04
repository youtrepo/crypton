'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CurrenciesSchema extends Schema {
  up () {
    this.create('currencies', (table) => {
      table.increments()
      table.string('iso',50).unique()
      table.string('name',255).unique()
      table.timestamps()
    })
  }

  down () {
    this.drop('currencies')
  }
}

module.exports = CurrenciesSchema
