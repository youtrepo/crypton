////notification add
function upNotifications(){
  var count = parseInt($('#notificationDropdown .badge').html());
  count++;
  $('#notificationDropdown .badge').html(count+'');
  $.playSound('/sounds/notification.mp3')
  $('#no_notifications').remove()
}
///update balance
function updateBalance(coin,value){
  if (coin.indexOf('btc')!==-1){
   let amount=parseFloat(value)
    let count = parseFloat($('#btc').html());
    let total=count+amount
    $('#btc').html(total);
  }
  //dash
  if (coin.indexOf('dash')!==-1){
    converted=convert.convertDASH(transaction.value,'duff','dash')
  }
  //ltc
  if (coin.indexOf('ltc')!==-1){
    converted=convert.convertLTC(transaction.value,'photon','ltc')
  }
  //bch
  if (coin.indexOf('bch')!==-1){
    converted=convert.convertBCH(transaction.value,'satoshi','bch')
  }
}
///subscribe to notifications
function subscribeToNotifications () {
  $.ajax({
    type:'POST',
    url:'/notifications',
    dataType:'json',
    data:{ _csrf:$("input[name=_csrf]").val(),type:'notifications'},
    success:function (data){
      switch (data.success){
        case true:
          const notifications = ws.subscribe('notifications:'+data.msg)
          notifications.on('notification',(msg)=>{
            if (msg.type==='transaction') {
              $('.notification-scroll a').after('<div class="dropdown-item">\n' +
                '              <div class="media">\n' +
                '                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-message-square"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>\n' +
                '                <div class="media-body">\n' +
                '                  <div class="notification-para"><span class="user-name">Transaction</span> '+msg.msg+'</div>\n' +
                '                  <div class="notification-meta-time">5 mins ago</div>\n' +
                '                </div>\n' +
                '              </div>\n' +
                '            </div>')
              upNotifications()
              updateBalance(msg.coin,msg.amount)
            }
          })
          notifications.on('error',(err)=>{
            console.log(err)
          })
          console.log('%c subscribed to notifications! ', 'color:green');
          break;
        default:
          console.log('%c cannot subscribe to notifications! ', 'color:red');
      }
    }
  })
}
