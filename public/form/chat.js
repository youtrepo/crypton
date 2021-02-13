const ps = new PerfectScrollbar('.chat-conversation-box', {
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
  const trade = ws.subscribe('trade')
  trade.on('done',(msg)=>{
    if (msg.trade==='cancelled'){
      $('.alert').removeClass('alert-light-primary').addClass('alert-light-danger').html('<strong>cancelled:</strong> This trade was cancelled')
      $('#trade_actions').addClass('hidden')
      $('.chat-footer input').attr('disabled',true)
      $('.chat-footer button').attr('disabled',true)
    }
  })
}

