function offer_delete(id,rm,token){
  $.ajax({
    type:"POST",
    url:"/offer_actions",
    data:{id:id,action:'delete', _csrf: token},
    success:function (data){
      switch (data){
        case 'offer deleted':
          Snackbar.show({
            text: 'offer deleted successfully',
            pos: 'top-right',
            actionTextColor: '#fff',
            backgroundColor: '#8dbf42'
          });
          cf.row("#"+rm).remove().draw();
          break;
        default:
          Snackbar.show({
            text: 'something went wrong.',
            pos: 'top-right',
            actionTextColor: '#fff',
            backgroundColor: '#e7515a'
          });
      }

    }
  })
}

///active
function offer_visible(id,rm,token){
  let action=''
  if ( $('#'+rm+' .vs').hasClass('btn-danger')){
   action='active'
  }else {
    action='disabled'
  }
  $.ajax({
    type:"POST",
    url:"/offer_actions",
    data:{id:id,action:action, _csrf: token},
    success:function (data){
      switch (data){
        case 'offer active':
          Snackbar.show({
            text: 'offer enabled successfully',
            pos: 'top-right',
            actionTextColor: '#fff',
            backgroundColor: '#8dbf42'
          });
          $('#'+rm+' .badge').removeClass('badge-danger').addClass('badge-primary').html('active')
          $('#'+rm+' .vs').removeClass('btn-danger').addClass('btn-outline-danger')
          break;
        case 'offer disabled':
          Snackbar.show({
            text: 'offer disabled successfully',
            pos: 'top-right',
            actionTextColor: '#fff',
            backgroundColor: '#8dbf42'
          });
          $('#'+rm+' .badge').removeClass('badge-primary').addClass('badge-danger').html('disabled')
          $('#'+rm+' .vs').removeClass('btn-outline-danger').addClass('btn-danger')
          break;
        default:
          Snackbar.show({
            text: 'something went wrong.',
            pos: 'top-right',
            actionTextColor: '#fff',
            backgroundColor: '#e7515a'
          });
      }

    }
  })
}
