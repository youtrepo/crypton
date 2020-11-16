$(document).ready(() => {
  $('form').on('submit',(e)=> {
    let username = $('#username').val();
    let password = $('#password').val();
    let email=$('#email').val();
    if (username==''){
      $('#error').html('<div class="alert alert-arrow-left alert-icon-left alert-light-danger mb-4" role="alert">\n' +
        '                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x-circle"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>\n' +
        '                <strong>Warning!</strong> Username is required\n' +
        '              </div>')
    }else if (username.length>10){
      $('#error').html('<div class="alert alert-arrow-left alert-icon-left alert-light-danger mb-4" role="alert">\n' +
        '                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x-circle"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>\n' +
        '                <strong>Warning!</strong> Username must be 10 characters or less\n' +
        '              </div>')
    }else if (password.length<6){
      $('#error').html('<div class="alert alert-arrow-left alert-icon-left alert-light-danger mb-4" role="alert">\n' +
        '                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x-circle"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>\n' +
        '                <strong>Warning!</strong> Password must be 6 characters long or more\n' +
        '              </div>')
    }else{
      $.ajax({
        type:'POST',
        url:'/register',
        data: $('form').serialize()
        ,
        beforeSend:()=>{
          $('#spin').removeClass('d-none').addClass('d-inline-block')
        },
        success:(data)=> {
          switch (data) {
            case 'User exists':
              grecaptcha.reset();
              $('#error').html('<div class="alert alert-arrow-left alert-icon-left alert-light-danger mb-4" role="alert">\n' +
                '                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x-circle"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>\n' +
                '                <strong>Warning!</strong> Email exists,Please log in\n' +
                '              </div>')
              $('#spin').removeClass('d-inline-block').addClass('d-none')
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
              grecaptcha.reset();
              $('#error').html('<div class="alert alert-arrow-left alert-icon-left alert-light-danger mb-4" role="alert">\n' +
                '                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x-circle"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>\n' +
                '                <strong>Warning!</strong> Captcha error\n' +
                '              </div>')
              $('#spin').removeClass('d-inline-block').addClass('d-none')
              break;
            case 'username exists':
              grecaptcha.reset();
              $('#error').html('<div class="alert alert-arrow-left alert-icon-left alert-light-danger mb-4" role="alert">\n' +
                '                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x-circle"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>\n' +
                '                <strong>Warning!</strong> Username exists,Please choose another username\n' +
                '              </div>')
              $('#spin').removeClass('d-inline-block').addClass('d-none')
              break;
          }
        }

      })
    }
    e.preventDefault();
  });

});


