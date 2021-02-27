'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ActivitiesSchema extends Schema {
  up () {
    this.create('activities', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('activities')
  }
}

module.exports = ActivitiesSchema
