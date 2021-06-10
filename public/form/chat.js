 new PerfectScrollbar('.chat-conversation-box', {
  suppressScrollX : true
});

const getScrollContainer = document.querySelector('.chat-conversation-box');
getScrollContainer.scrollTop = getScrollContainer.scrollHeight;

const token=$('#token').val()

function subscribeToChannel () {
  const chat = ws.subscribe('chat:'+token)
  chat.on('message', (msg) => {
    if ($('.conversation-start span').text()==='No data'){
      $('.conversation-start span').html(msg.time)
    }
    let user = $('#real_me').val().trim()
    if (msg.user === user) {
      $messageHtml = '<div class="bubble me">' + msg.msg + '</div>';
      var appendMessage = $('.active-chat').append($messageHtml);
      const getScrollContainer = document.querySelector('.chat-conversation-box');
      getScrollContainer.scrollTop = getScrollContainer.scrollHeight;
      var clearChatInput = $('.mail-write-box').val('');
    } else {
      $messageHtml = '<div class="bubble you">' + msg.msg + '</div>';
      var appendMessage = $('.active-chat').append($messageHtml);
      const getScrollContainer = document.querySelector('.chat-conversation-box');
      getScrollContainer.scrollTop = getScrollContainer.scrollHeight;
      var clearChatInput = $('.mail-write-box').val('');
    }
  })
  chat.on('error',(err)=>{
    console.log(err)
  })
}


//send message
$('#send button').on('click',function (){
  var chatInput = $('.message');
  let user=$('#real_me').val().trim()
  var chatMessageValue = chatInput.val();
  if (chatMessageValue === '') { return; }
  ws.getSubscription('chat:'+token).emit('message', {
    user:user,
    msg: chatMessageValue
  })
  const getScrollContainer = document.querySelector('.chat-conversation-box');
  getScrollContainer.scrollTop = getScrollContainer.scrollHeight;
  var clearChatInput = chatInput.val('');
})

//enter button
$('.message').on('keydown', function(event) {
  if(event.key === 'Enter') {
    var chatInput = $(this);
    let user = $('#real_me').val().trim()
    var chatMessageValue = chatInput.val();
    if (chatMessageValue === '') {
      return;
    }
    ws.getSubscription('chat:' + token).emit('message', {
      user: user,
      msg: chatMessageValue
    })
    const getScrollContainer = document.querySelector('.chat-conversation-box');
    getScrollContainer.scrollTop = getScrollContainer.scrollHeight;
    var clearChatInput = chatInput.val('');
  }
})


 //trade websockets events
function subscribeToTrade () {
  const trade = ws.subscribe('trade:'+token)
  trade.on('done',(msg)=>{
    if (msg.trade==='cancelled'){
      $('.alert').removeClass('alert-light-primary alert-light-info alert-light-warning alert-light-success').addClass('alert-light-danger').html('<strong>cancelled:</strong> This trade was cancelled')
      $('.blockquote .badge').removeClass(' badge-primary  badge-info badge-warning  badge-success').addClass(' badge-danger').html('Paid')
      $('#trade_actions').addClass('hidden')
      $('.chat-footer input').attr('disabled',true)
      $('.chat-footer button').attr('disabled',true)
    }else if (msg.trade==='paid'){
      $('.blockquote .badge').removeClass(' badge-danger  badge-danger  badge-success').addClass(' badge-info').html('Paid')
      $('.alert').removeClass('alert-light-primary alert-light-danger alert-light-warning alert-light-success').addClass('alert-light-info').html('<strong>Paid:</strong> This buyer has marked the payment as paid.')
    }else if (msg.trade==='disputed'){
      $('#trade_actions button').attr('disabled',true)
      $('.blockquote .badge').removeClass(' badge-danger  badge-info  badge-success').addClass(' badge-warning').html('Disputed')
      $('.alert').removeClass('alert-light-primary alert-light-info alert-light-success').addClass('alert-light-warning').html('<strong>Disputed:</strong> This trade is under <strong>Dispute</strong> and is under investigation.')
    }else if (msg.trade==='completed'){
      //alerts
      $('.blockquote .badge').removeClass(' badge-danger  badge-info  badge-warning').addClass(' badge-success').html('Completed')
      $('.alert').removeClass('alert-light-danger  alert-light-info alert-light-warning').addClass('alert-light-success').html('<button type="button" class="close" data-dismiss="alert" aria-label="Close"><svg> ... </svg></button>\n' +
        '                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-info"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>\n' +
        '                <strong>Completed:</strong> This trade has been <strong>Completed</strong>')
      $('#trade_actions button').attr('disabled', true)


      //show ratings modal
      //we need to wait a number of seconds for the user to read the alerts
      setTimeout(function (){
        $('#ratingsModal').modal('show')
      },2000)

    }
  })

  trade.on('error',msg=>{console.log(msg)})
}

//confirm paid
function confirmtrade(id,token){
  $.ajax({
    type:'POST',
    url:'/confirm',
    dataType:'json',
    data:{_csrf: token,id:$('#token').val()},
    success:function (data){
      if (data.status==='success') {
        //stop the timer
        $('#cd-circle').countdown('stop');
        $('#slideupModal').modal('hide')
        $('#trade_actions>button').attr('disabled',true)
        ws.getSubscription('trade:'+$('#token').val()).emit('message', {
          msg: 'paid',
          token: $('#token').val()
        })
      }

    }
  })
}

 ///trade functions

 //dispute trade
 function dispute(id,token,user){
   $.ajax({
     type:'post',
     url:'/dispute',
     data:{id:id, _csrf:token,user:user},
     success:function (data){
       switch (data.success){
         case true:
           $('#standardModal').modal('hide')
           Snackbar.show({
             text: data.msg,
             actionTextColor: '#fff',
             backgroundColor: '#1abc9c'
           });
           ws.getSubscription('trade:'+$('#token').val()).emit('message', {
             msg: 'disputed',
             token: $('#token').val()
           })
           $('.blockquote .badge').removeClass(' badge-danger  badge-info  badge-success').addClass(' badge-warning').html('Disputed')
           $('.alert').removeClass('alert-light-danger  alert-light-info').addClass('alert-light-warning').html('<button type="button" class="close" data-dismiss="alert" aria-label="Close"><svg> ... </svg></button>\n' +
             '                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-info"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>\n' +
             '                <strong>Disputed:</strong> This trade is under <strong>Dispute</strong> and is on investigation')
           $('#trade_actions button').attr('disabled',true)
           break;
         case false:
           $('#standardModal').modal('hide')
           Snackbar.show({
             text: data.msg,
             actionTextColor: '#fff',
             backgroundColor: '#e7515a'
           });
           break;
       }

     }
   })
 }

 ///release coin
 function release(id,token,user){
   $.ajax({
     type:'post',
     url:'/releaseCoin',
     data:{id:id, _csrf:token,user:user},
     success:function (data) {
       switch (data.success) {
         case true:
           $('#releaseModal').modal('hide')
           Snackbar.show({
             text: data.msg,
             actionTextColor: '#fff',
             backgroundColor: '#1abc9c'
           });

           //alert user trade is completed
           ws.getSubscription('trade:' + $('#token').val()).emit('message', {
             msg: 'completed',
             token: $('#token').val()
           })
           break;
         case false:
           $('#releaseModal').modal('hide')
           Snackbar.show({
             text: data.msg,
             actionTextColor: '#fff',
             backgroundColor: '#e7515a'
           });
           break;
       }
     }
 })
 }
 //cancel trade
 function cancel(id,token,user){
   $.ajax({
     type:'post',
     url:'/canceltrade',
     data:{id:id, _csrf:token,user:user},
     success:function (data) {
       switch (data.success) {
         case true:
           $('#releaseModal').modal('hide')
           Snackbar.show({
             text: data.msg,
             actionTextColor: '#fff',
             backgroundColor: '#1abc9c'
           });

           //alert user trade is completed
           ws.getSubscription('trade:' + $('#token').val()).emit('message', {
             msg: 'cancelled',
             token: $('#token').val()
           })
           break;
         case false:
           $('#releaseModal').modal('hide')
           Snackbar.show({
             text: data.msg,
             actionTextColor: '#fff',
             backgroundColor: '#e7515a'
           });
           break;
       }
     }
   })
 }

 //ratings
  function ratings(id){
    $.ajax({
      type:'post',
      url:'/rate',
      data:$('#rates').serialize(),
      success:function (data){
        if (data.success){
          $('#ratingsModal').modal('hide')
          setTimeout(function (){
            $('#releaseModal').modal('hide')
            Snackbar.show({
              text: data.msg,
              actionTextColor: '#fff',
              backgroundColor: '#1abc9c'
            });
          })
        }

      }
    })
 }


