$(document).ready(() => {
  $('form').on('submit',(e)=> {
    let password = $('#password').val();
    let email=$('#email').val();
    if (email==''){
      $('#error').html('<div class="alert alert-arrow-left alert-icon-left alert-light-danger mb-4" role="alert">\n' +
        '                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x-circle"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>\n' +
        '                <strong>Warning!</strong> Email is required\n' +
        '              </div>')
    }else if (password.length<6){
      $('#error').html('<div class="alert alert-arrow-left alert-icon-left alert-light-danger mb-4" role="alert">\n' +
        '                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x-circle"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>\n' +
        '                <strong>Warning!</strong> Password must be 6 characters long or more\n' +
        '              </div>')
    }else{
      $.ajax({
        type:'POST',
        url:'/signin',
        data: $('form').serialize()
        ,
        beforeSend:()=>{
          $('#spin').removeClass('invisible').addClass('visible')
        },
        success:(data)=> {
          switch (data) {
            case 'User exists':
              $('#error').html('<div class="alert alert-arrow-left alert-icon-left alert-light-danger mb-4" role="alert">\n' +
                '                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x-circle"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>\n' +
                '                <strong>Warning!</strong> User exists,Please log in\n' +
                '              </div>')
              $('#spin').removeClass('visible').addClass('invisible')
              grecaptcha.reset();
              break;
            case 'success':
              $('#error').html('<div class="alert alert-arrow-left alert-icon-left alert-light-success mb-4" role="alert">\n' +
                '                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check"><polyline points="20 6 9 17 4 12"></polyline></svg>\n' +
                '                <strong>Success!</strong> Redirecting you to Dashboard\n' +
                '              </div>')
              setTimeout(function (){
                window.location.href='/dashboard'
              },2000)
              break;
            case 'Captcha error':
              $('#error').html('<div class="alert alert-arrow-left alert-icon-left alert-light-danger mb-4" role="alert">\n' +
                '                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x-circle"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>\n' +
                '                <strong>Warning!</strong> Captcha error\n' +
                '              </div>')
              $('#spin').removeClass('visible').addClass('invisible')
              grecaptcha.reset();
              break;
            case 'Account not found':
              $('#error').html('<div class="alert alert-arrow-left alert-icon-left alert-light-danger mb-4" role="alert">\n' +
                '                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x-circle"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>\n' +
                '                <strong>Warning!</strong>Account not found,Please register\n' +
                '              </div>')
              $('#spin').removeClass('visible').addClass('invisible')
              grecaptcha.reset();
              break;
            case 'different ip':
              $('#error').html('<div class="alert alert-arrow-left alert-icon-left alert-light-danger mb-4" role="alert">\n' +
                '                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x-circle"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>\n' +
                '                <strong>Warning!</strong>sign in from a new ip,please verify login from the email sent to you\n' +
                '              </div>')
              $('#spin').removeClass('visible').addClass('invisible')
              grecaptcha.reset();
              break;
            case 'invalid password':
              $('#error').html('<div class="alert alert-arrow-left alert-icon-left alert-light-danger mb-4" role="alert">\n' +
                '                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x-circle"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>\n' +
                '                <strong>Warning!</strong>Invalid password\n' +
                '              </div>')
              $('#spin').removeClass('visible').addClass('invisible')
              grecaptcha.reset();
              break;

          }
        }

      })
    }
    e.preventDefault();
  });

});
