'use strict'

const alerts=use('App/Models/Alert')
const md = require('markdown-it')({
  html: true,
  linkify: true,
  typographer: true
});



class AdminactionController {
  async actions({request,response,auth,view}){
    try {
      await auth.check()
      let user = await auth.getUser()
      let isAdmin = (user.is_admin === 1)
      if (isAdmin) {
        let data=request.only(['action'])
        let [action]=[data.action]
        switch (action) {
          case 'addAlert':
            let info=request.only(['type','content'])
            let [content,type]=[md.render(info.content),info.type]
            if (type&&content){
              await alerts.create({
                type:type,
                msg:content
              })
              await response.json({success:true,msg:'alert added successfully'})
            }
            break
          case 'deleteAlert':
            let data=request.only(['id'])
            const alert = await alerts.find(data.id)
            await alert.delete()
            await response.json({success:true,msg:'alert deleted successfully'})

        }
      }else {
      response.status(403).json({success:false,msg:'Access forbidden'})
    }
  } catch (e) {
    if (e.message === 'E_INVALID_SESSION: Invalid session') {
      response.status(403).json({success:false,msg:'Access forbidden'})
    } else {
      response.status(500).json({success:false,msg:'Something went wrong'})
    }
    console.log(e)
  }
  }
}

module.exports = AdminactionController
