'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', 'IndexController.index')
Route.get('/login','LoginController.login')
Route.get('/signup','SignupController.signup')
Route.post('/register','RegisterController.register')
Route.get('/dashboard','DashboardController.dashboard')
Route.post('/authenticate','AuthenticateController.authenticate')
Route.get('/logout','LogoutController.logout')
Route.get('/walletbtc','WalletbtcController.walletbtc')
