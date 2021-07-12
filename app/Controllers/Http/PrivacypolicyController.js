'use strict'

const Antl = use('Antl')

Antl.bootLoader()
class PrivacypolicyController {
  async privacy({request,response,view}){
    return view.render('landing/privacy_policy',{Antl:Antl})
  }
}

module.exports = PrivacypolicyController
