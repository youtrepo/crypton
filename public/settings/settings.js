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
