'use strict'

const offer=use('App/Models/Offer')
class OfferActionController {
  async offer_actions({request,response}){
    if (request.ajax()) {
      try{
        let data=await request.only(['id','action'])
        switch (data.action){
          case 'delete':
            let offer_delete=await offer
              .query()
              .where({offer_id:data.id})
              .delete()
            return response.send('offer deleted')
        }
      }catch (e) {
        console.log(e)
        return response.send('something is not right')
      }
    }

  }
}

module.exports = OfferActionController
