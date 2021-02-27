'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BalancesSchema extends Schema {
  up () {
    this.create('balances', (table) => {
      table.increments()
      table.string('email',255)
      table.string('coin',55)
      table.decimal('value',null).defaultTo(0)
      table.timestamps()
    })
  }

  down () {
    this.drop('balances')
  }
}

module.exports = BalancesSchema
