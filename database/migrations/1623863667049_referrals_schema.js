'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ReferralsSchema extends Schema {
  up () {
    this.create('referrals', (table) => {
      table.increments()
      table.string('username')
      table.string('ref')
      table.string('email')
      table.timestamps()
    })
  }

  down () {
    this.drop('referrals')
  }
}

module.exports = ReferralsSchema
