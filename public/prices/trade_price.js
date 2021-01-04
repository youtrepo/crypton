$(document).ready(function (){
  $('#coin').on('input',function (){
    let [coin,rate,min,max]=[$(this).val(),$('#rate').val(),$('#min').val(),$('#max').val()]
    let calculated_price=coin*rate
    $('#currency').val(calculated_price.toFixed(2))
    if (calculated_price>max||calculated_price<min){
      $('.invalid-feedback').addClass('d-block')
    }else {
      $('.invalid-feedback').removeClass('d-block').addClass('d-none')
    }
  })

  $('#currency').on('input',function (){
    let [currency,rate,min,max]=[$(this).val(),$('#rate').val(),$('#min').val(),$('#max').val()]
    let calculated_price=currency/rate
    $('#coin').val(calculated_price.toFixed(8))
    if (currency>max||currency<min){
      $('.invalid-feedback').addClass('d-block')
    }else {
      $('.invalid-feedback').removeClass('d-block').addClass('d-none')
    }
  })

  //submit form
  $('form').on('submit',function (e){
    e.preventDefault()
    let [currency,min,max]=[$('#currency').val(),$('#rate').val(),$('#min').val(),$('#max').val()]
    if (currency>max||currency<min){
      $('.invalid-feedback').addClass('d-block')
    }else {
      $('.invalid-feedback').removeClass('d-block').addClass('d-none')
      //submit form
    }


  })
})


