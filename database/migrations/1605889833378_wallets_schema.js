'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class WalletsSchema extends Schema {
  up () {
    this.create('wallets', (table) => {
      table.increments()
      table.string('email',565)
      table.string('coin',55)
      table.string('address',565).unique()
      table.string('walletid').unique()
      table.string('status',55)
      table.timestamps()
    })
  }

  down () {
    this.drop('wallets')
  }
}

module.exports = WalletsSchema
