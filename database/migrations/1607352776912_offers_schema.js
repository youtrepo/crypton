'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OffersSchema extends Schema {
  up () {
    this.create('offers', (table) => {
      table.increments()
      table.string('offer_id',565).unique()
      table.string('email',565)
      table.string('offer_type',50)
      table.string('coin',90)
      table.string('payment_method',565)
      table.string('currency',565)
      table.integer('margin',11)
      table.integer('min_amount',11)
      table.integer('max_amount',11)
      table.integer('timeframe',11)
      table.string('country',565)
      table.text('terms','longtext')
      table.text('instructions','longtext')
      table.string('privacy',90)
      table.string('requirements',90)
      table.timestamps()
    })
  }

  down () {
    this.drop('offers')
  }
}

module.exports = OffersSchema
