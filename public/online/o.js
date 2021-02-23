$(window).on('focus',function (){
  console.log('online')
})

$(window).on('blur',function (){
  console.log('offline')
})

//cookies
function setCookie(name,value,days) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + (days*24*60*60*1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}
function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
    var c = ca[i];
    while (c.charAt(0)==' ') c = c.substring(1,c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}
function eraseCookie(name) {
  document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

$('#theme-switcher').click(function () {
  $.blockUI({
    message: '<div class="spinner-border text-white mr-2 align-self-center loader-sm "></div>',
    fadeIn: 800,
    timeout: 2000, //unblock after 2 seconds
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
    }, onBlock: function () {
      if ($('#theme-switcher').hasClass('btn-dark')) {
        const hrefs = $('link[rel="stylesheet"]')
        hrefs.each(function () {
          if ($(this).attr('href').indexOf('light') !== -1) {
            let rel = $(this).attr('href').replace("light", "darkness");
            $(this).attr('href', rel)
          }
        })
        $('#theme-switcher').removeClass('btn-dark').addClass('btn-warning')
        $('#theme-switcher').html('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-sun"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>\n')
        setCookie('theme','darkness',7000);
      } else {
        const hrefs = $('link[rel="stylesheet"]');
        hrefs.each(function () {
          if ($(this).attr('href').indexOf('darkness') !== -1) {
            let rel = $(this).attr('href').replace("darkness", "light");
            $(this).attr('href', rel)
          }
        })
        $('#theme-switcher').removeClass('btn-warning').addClass('btn-dark')
        $('#theme-switcher').html('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-moon"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>\n')
        setCookie('theme','light',7000);
      }
    }
  })
})
///set theme

let x = getCookie('theme');
if (x==='darkness') {
  let hrefs = $('link[rel="stylesheet"]')
  hrefs.each(function () {
    if ($(this).attr('href').indexOf('light') !== -1) {
      let rel = $(this).attr('href').replace("light", "darkness");
      $(this).attr('href', rel)
    }else if (x==='light'){
      let hrefs = $('link[rel="stylesheet"]')
      hrefs.each(function () {
        if ($(this).attr('href').indexOf('darkness') !== -1) {
          let rel = $(this).attr('href').replace("darkness", "light");
          $(this).attr('href', rel)
        }
      })
    }
  })
}
