'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TransactionsSchema extends Schema {
  up () {
    this.create('transactions', (table) => {
      table.increments()
      table.decimal('value',null)
      table.string('wallet',265)
      table.decimal('amount',null)
      table.string('txid',565).unique()
      table.string('coin',50)
      table.string('type',90)
      table.string('email',265)
      table.timestamps()
    })
  }

  down () {
    this.drop('transactions')
  }
}

module.exports = TransactionsSchema
