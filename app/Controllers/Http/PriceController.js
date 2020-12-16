'use strict'


const Client = require('coinbase').Client;
const mysecret = 'YmPmAsNeuwvEiufNue4erKBktoCaShhF'
const mykey = 'jawBVbmyN9GPhQvs'

const client = new Client({'apiKey': mykey, 'apiSecret': mysecret,strictSSL:false});
class PriceController {
  async prices({request,response}){
    response.implicitEnd = false
    try {
      let data = await request.post()
      await client.getExchangeRates({'currency':data.coin} ,function(err, rates) {
        return response.send(rates)
      })
    }catch (e) {
      console.log(e)
    }

  }
}

module.exports = PriceController
