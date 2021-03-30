'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EscrowSchema extends Schema {
  up () {
    this.create('escrows', (table) => {
      table.increments()
      table.string('trade_id')
      table.string('coin',50)
      table.string('email')
      table.string('status')
      table.decimal('amount',null)
      table.timestamps()
    })
  }

  down () {
    this.drop('escrows')
  }
}

module.exports = EscrowSchema
