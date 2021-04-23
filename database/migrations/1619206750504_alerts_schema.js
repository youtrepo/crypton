'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AlertsSchema extends Schema {
  up () {
    this.create('alerts', (table) => {
      table.increments()
      table.string('type',55)
      table.text('msg','longtext')
      table.timestamps()
    })
  }

  down () {
    this.drop('alerts')
  }
}

module.exports = AlertsSchema
