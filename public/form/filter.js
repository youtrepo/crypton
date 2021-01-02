$('form').on('submit',function (e){
  e.preventDefault();
  let data=$(this).serializeArray();
  let [coin,currency,payment]=[data[0].value,data[1].value,data[3].value]
  buy.column(1).search(coin).column(2).search(payment).column(3).search(currency).draw();
  $('#filterModal').modal('hide')
})

