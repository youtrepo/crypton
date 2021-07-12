'use strict'

const Antl = use('Antl')

Antl.bootLoader()
class TermsofserviceController {
  async tos({request,response,view}){
    return view.render('landing/terms_of_service',{Antl:Antl})
  }
}

module.exports = TermsofserviceController
