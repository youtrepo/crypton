'use strict'

/*
|--------------------------------------------------------------------------
| CoinSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const coin=use('App/Models/Coin')

class CoinSeeder {
  async run () {
    try{
      let coins=[
        {
          coin:'Btc'
        },
        {
          coin:'Bch'
        },
        {
          coin:'Dash'
        },
        {
          coin:'Ltc'
        },
        {
          coin:'Usdt'
        },
        {
          coin:'Bnb'
        }
      ]
      await coin.createMany(coins)
    }catch (e) {
      console.log(e)
    }
  }
}

module.exports = CoinSeeder
