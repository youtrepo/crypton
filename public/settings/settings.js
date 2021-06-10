//function to update email on settings
function updateEmail(){
  $.ajax({

  })
}

////upload profile pic
$('form[name="profilePic_form"]').on('submit',function (e){
  e.preventDefault();
  $.ajax({
    type:'POST',
    dataType: "JSON",
    processData: false,
    contentType: false,
    url:'/upload',
    data:new FormData(this),
    success:function (data){
switch (data.success){
  case true:
    Snackbar.show({
      text: data.msg,
      actionTextColor: '#fff',
      backgroundColor: '#1abc9c'
    });
    ///render the updated profile image
    if (!$('#pp img')){
      $('form[name="profilePic_form"]').append(' <div class="avatar avatar-xl" id="pp">\n' +
        '                         <img alt="avatar" src="data:image/png;base64,"'+data.file+' class="rounded-circle" />\n' +
        '                       </div>')
    }
    $('#pp img').attr('src','data:image/png;base64,'+data.file)
    break;
  case false:
    Snackbar.show({
      text: data.msg,
      actionTextColor: '#fff',
      backgroundColor: '#e7515a'
    });
    break;
}
    }
  })
})


//update Bio
$('form[name="bio_form"]').on('submit',function (e){
  e.preventDefault();
  $.ajax({
    type:'POST',
    dataType: "JSON",
    url:'/bio',
    data:$(this).serialize(),
    success:function (data){
      switch (data.success){
        case true:
          Snackbar.show({
            text: data.msg,
            actionTextColor: '#fff',
            backgroundColor: '#1abc9c'
          });
          break;
        case false:
          Snackbar.show({
            text: data.msg,
            actionTextColor: '#fff',
            backgroundColor: '#e7515a'
          });
          break;
      }
    }
  })
})


//verification token
function sendVerification(token){
  $.ajax({
    type:'POST',
    dataType: "JSON",
    url:'/sendVerification',
    data:{
      _csrf:token
    },
    success:function (data){
      switch (data.success){
        case true:
          Snackbar.show({
            text: data.msg,
            actionTextColor: '#fff',
            backgroundColor: '#1abc9c'
          });
          break;
        case false:
          Snackbar.show({
            text: data.msg,
            actionTextColor: '#fff',
            backgroundColor: '#e7515a'
          });
          break;
      }
    }
  })
}

//2fa
$('form[name="2fa"]').on('submit',function (e){
  e.preventDefault()
  $.ajax({
    type:'post',
    url:'/2fa',
    data:$(this).serialize(),
    success:function (data){
      switch (data.success) {
        case true:
          Snackbar.show({
            text: data.msg,
            actionTextColor: '#fff',
            backgroundColor: '#1abc9c'
          });
          break;
        case false:
          Snackbar.show({
            text: data.msg,
            actionTextColor: '#fff',
            backgroundColor: '#e7515a'
          });
          break;
      }
    }
  })
})
