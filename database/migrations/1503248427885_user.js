'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
      table.string('username', 80).notNullable().unique()
      table.string('email', 254).notNullable().unique()
      table.string('password', 60).notNullable()
      table.string('country',60).notNullable()
      table.string('ip',60).notNullable()
      table.string('token',565).notNullable()
      table.string('verified',55).nullable()
      table.integer('is_admin').defaultTo(0)
      table.boolean('2fa').defaultTo(false)
      table.string('secret',255).nullable()
      table.text('bio','longtext')
      table.string('login_source',55)
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
