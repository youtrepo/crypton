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
Route.get('/walletbch','WalletbchController.walletbch')
Route.get('/walletdash','WalletdashController.walletdash')
Route.get('/walletltc','WalletltcController.walletltc')
Route.post('/transactions','TransactionController.transactions')
Route.get('/create_offer','CreateofferController.create_offer')
Route.post('/c_offer','COfferController.c_offer')
Route.get('/offers','UserofferController.offers')
Route.post('/offer_actions','OfferActionController.offer_actions')
Route.post('/prices','PriceController.prices')
Route.get('/buy_coin','BuyOfferController.buy')
Route.get('/buy/:id','BuyController.buy')
Route.get('/chat/:id','ChatController.chat')
Route.post('/start_trade','StarttradeController.start')

///errors
Route.on('/500').render('errors/500')
