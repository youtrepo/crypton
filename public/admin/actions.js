///admin form actions here
$('form[name="mass_alert"]').on('submit',function (e){
  //prevent page reload on form submission
  e.preventDefault()

  //then we submit the form
  $.ajax({
    type:'POST',
    url:'/adminActions',
    data:$(this).serialize()+'&action=addAlert',
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

//delete alert
function deleteAlert(id,token,action='deleteAlert'){
  $.ajax({
    type:'POST',
    url:'/adminActions',
    data:{
      id:id,
      _csrf:token,
      action:action
    },
    success:function (data){
      switch (data.success){
        case true:
            $('#'+id).remove()
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
