'use strict'
const Helpers = use('Helpers')
const Drive=use('Drive')

///controller to upload profile pic
class ProfilepicuploaderController {
  async upload({request, response, view, auth}) {
    try {
      await auth.check()
      let user = await auth.getUser()
      const profilePic = await request.file('profilePic', {
        types: ['image'],
        size: '2mb'
      })
      await profilePic.move(Helpers.tmpPath('uploads/' + user.username), {
        name: 'pic.jpg',
        overwrite: true
      })
      if (!profilePic.moved()) {
        let uploadError=profilePic.error()
        return response.json({success:false,msg:uploadError.message})
      }
      ///now lets get the file and return it
      const exists = await Drive.exists(`uploads/${user.username}/pic.jpg`)
      let file=null

      //if the file exists
      if (exists){
        file=await Drive.get(`uploads/${user.username}/pic.jpg`,'base64')
      }
      return response.json({success:true,msg:'file upload success',file:file})
    } catch (e) {
      if (e.message === 'E_INVALID_SESSION: Invalid session') {
        response.status(403).json({success:false,msg:'access forbidden'})
      } else {
        response.status(500).json({success:false,msg:'internal server error'})
      }
      console.log(e)

    }
  }
}

module.exports = ProfilepicuploaderController
