$('form').on('submit',function (e){
  e.preventDefault()
        $.ajax({
          type: 'POST',
          url: '/c_offer',
          data: $('form').serialize(),
          success: function (data) {
            if (data === 'success') {
              Snackbar.show({
                text: 'Offer created successfully.Please reload if you want to create another offer!',
                pos: 'top-right',
                actionTextColor: '#fff',
                backgroundColor: '#8dbf42'
              });
              setTimeout(function (){
                window.location.href='/offers'
              },2000)
            }else {
              Snackbar.show({
                text: 'something went wrong.',
                pos: 'top-right',
                actionTextColor: '#fff',
                backgroundColor: '#e7515a'
              });
            }
          }
        })
})
