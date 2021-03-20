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

function subscribeToTrade () {
  const trade = ws.subscribe('trade:'+token)
  trade.on('done',(msg)=>{
    if (msg.trade==='cancelled'){
      $('.alert').removeClass('alert-light-primary').addClass('alert-light-danger').html('<strong>cancelled:</strong> This trade was cancelled')
      $('#trade_actions').addClass('hidden')
      $('.chat-footer input').attr('disabled',true)
      $('.chat-footer button').attr('disabled',true)
    }else if (msg.trade==='paid'){
      $('.alert').removeClass('alert-light-primary').addClass('alert-light-info').html('<strong>Paid:</strong> This buyer has marked the payment as paid.')
    }
  })
}

//confirm
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
        $('#slideupModal').modal('dispose')
        $('#trade_actions>button').attr('disabled',true)
        ws.getSubscription('trade:'+$('#token').val()).emit('message', {
          msg: 'paid',
          token: $('#token').val()
        })
      }

    }
  })
}


