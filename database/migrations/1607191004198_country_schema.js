'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CountrySchema extends Schema {
  up () {
    this.create('countries', (table) => {
      table.increments()
      table.string('iso',4)
      table.string('name',80)
      table.string('nicename',80)
      table.string('iso3',3)
      table.integer('numcode',6)
      table.integer('phonecode',5)
      table.timestamps()
    })
  }

  down () {
    this.drop('countries')
  }
}

module.exports = CountrySchema
