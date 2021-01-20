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
      $.ajax({
        type:"POST",
        url:'/start_trade',
        data:$(this).serialize(),
        beforeSend:function (){
          $.blockUI({
            message: '<div class="spinner-border text-white mr-2 align-self-center loader-sm "></div>',
            fadeIn: 800,
            timeout: 3000, //unblock after 2 seconds
            overlayCSS: {
              backgroundColor: '#1b2024',
              opacity: 0.8,
              zIndex: 1200,
              cursor: 'wait'
            },
            css: {
              border: 0,
              color: '#fff',
              zIndex: 1201,
              padding: 0,
              backgroundColor: 'transparent'
            }
          })

        },
        success:function (data){
          ///do anything with data
          (async()=>{
            await Ws.on('connect',(socket)=>{socket.join(data.chat)})
             window.location.href='/chat/'+data.chat
          })()
        }

      })
    }


  })
})


