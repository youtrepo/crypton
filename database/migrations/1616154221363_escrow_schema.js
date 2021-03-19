'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EscrowSchema extends Schema {
  up () {
    this.create('escrows', (table) => {
      table.increments()
      table.string('offer_id').unique()
      table.decimal('amount',null)
      table.timestamps()
    })
  }

  down () {
    this.drop('escrows')
  }
}

module.exports = EscrowSchema
