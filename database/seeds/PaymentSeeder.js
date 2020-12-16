'use strict'

/*
|--------------------------------------------------------------------------
| PaymentSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const payment=use('App/Models/Payment')
const Factory = use('Factory')

class PaymentSeeder {
  async run () {
    try {
      let payment_methods = [{
        name: 'paypal',
        category: 'online'
      }]
      await payment.createMany(payment_methods)
    }catch (e){
      console.log(e)
    }
  }
}

module.exports = PaymentSeeder
