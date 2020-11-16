'use strict'

const Env = use('Env')
const Antl = use('Antl')
Antl.bootLoader()
class IndexController {
  async index({request,response,view}){
  return view.render('landing/index',{title:Env.get('TITLE'),Antl:Antl})
  }
}

module.exports = IndexController
