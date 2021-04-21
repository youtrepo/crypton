'use strict'

const users=use('App/Models/User')

//controller to update user bio in settings
class BioController {
  async bio({request, response, auth}) {
    try {
      await auth.check()
      let user = await auth.getUser()
      let data = await request.only(['bio'])
      await users.query().where({email: user.email}).update({bio: data.bio})

      return response.json({success: true, msg: 'Bio updated successfully'})
    } catch (e) {
      if (e.message === 'E_INVALID_SESSION: Invalid session') {
        response.status(403).json({success: false, msg: 'access forbidden'})
      } else {
        response.status(500).json({success: false, msg: 'internal server error'})
      }
      console.log(e)

    }
  }
}

module.exports = BioController
