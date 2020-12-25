var typingTimer;                //timer identifier
var doneTypingInterval = 5000;  //time in ms, 5 second for example
var $input = $('#margin');

//on keyup, start the countdown
$input.on('keyup', function () {
  clearTimeout(typingTimer);
  typingTimer = setTimeout(doneTyping, doneTypingInterval);
});

//on keydown, clear the countdown
$input.on('keydown', function () {
  clearTimeout(typingTimer);
});

//user is "finished typing," do something
function doneTyping () {
  //do something
  let [coin,currency,margin]=[$('#coin').val(),$('#currency').val(),$('#margin').val()]
  $.ajax({
    type:'GET',
    url:'https://api.coinbase.com/v2/exchange-rates?currency='+coin,
    beforeSend:function (){
      $('#c_spin').removeClass('d-none').addClass('d-block')
      $('#price_data').removeClass('d-block').addClass('d-none')
    },
    success:function (data){
      var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency:currency,
      });
      let [value,rate]=[parseFloat(data.data['rates'][currency]),parseFloat(data.data['rates'][currency])]
      let m=margin/100*rate
      let total=value+m
      console.log(total)
      setTimeout(function (){
        $('#c_spin').removeClass('d-block').addClass('d-none')
        $('#price_data').removeClass('d-none').addClass('d-block').html("The current market price is <b>"+formatter.format(data.data['rates'][currency])+"</b> while this offer will be sold for <b>"+formatter.format(total))
      },2000)
    }
  })
}


