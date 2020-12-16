function price(coin,token,currency){
  $.ajax({
    type:'POST',
    url:'/prices',
    data:{
      coin:coin.toUpperCase(),
      currency:currency,
      _csrf: token
    },
    beforeSend:function (){
        $('#c_spin').removeClass('d-none').addClass('d-block')
      $('#price_data').removeClass('d-block').addClass('d-none')
    },
    success:function (data){
      var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency:currency,
      });
      setTimeout(function (){
        $('#c_spin').removeClass('d-block').addClass('d-none')
        $('#price_data').removeClass('d-none').addClass('d-block').html("The current market price is <b>"+formatter.format(data.data['rates'][currency])+"</b> while this offer will be sold for <b>"+formatter.format(data.data['rates'][currency]*0.1+data.data['rates'][currency]))
      },2000)
    }
  })
}
