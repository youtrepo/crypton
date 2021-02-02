'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TradesSchema extends Schema {
  up () {
    this.create('trades', (table) => {
      table.increments()
      table.uuid('trade_id').unique().defaultTo(this.db.raw('uuid_generate_v4()'))
      table.string('type',55)
      table.string('status',80)
      table.string('coin',50)
      table.decimal('local_amount',null)
      table.decimal('rate',null)
      table.string('offer_Id',565)
      table.string('currency',100)
      table.decimal('amount',null)
      table.string('seller',255)
      table.string('buyer',255)
      table.string('disputed_by',255)
      table.string('dispute_statement')
      table.datetime('deadline')
      table.timestamp('confirmed_at')
      table.timestamps()
    })
  }

  down () {
    this.drop('trades')
  }
}

module.exports = TradesSchema
