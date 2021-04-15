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
Route.get('/sell_coin','SellofferController.sell')
Route.get('/buy/:id','BuyController.buy')
Route.get('/sell/:id','SellController.sell')
Route.get('/chat/:id','ChatController.chat')
Route.post('/start_trade','StarttradeController.start')
Route.post('/notifications','NotificationsubscribeController.subscribe')
Route.post('/confirm','ConfirmtradeController.confirm')
Route.get('/profile','ProfileController.profile')
Route.post('/dispute','DisputeController.dispute')
Route.post('/releasecoin','ReleasecoinController.release')
Route.post('/rate','RateController.rate')
Route.post('/canceltrade','CanceltradeController.cancel')
Route.post('/start_sell-trade','StartselltradeController.start')
Route.get('/mytrades','MytradeController.trades')
Route.get('/settings','SettingController.settings')
Route.get('/referral','ReferralController.referral')
Route.get('/admin','AdminloginController.admin')


///errors
Route.on('/500').render('errors/500');
