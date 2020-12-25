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
function offer_visible(id,rm,action,token){
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
          this.action='disabled'
          $('#'+rm+' .vs').removeClass('btn-danger').addClass('btn-outline-danger')
          break;
        case 'offer disabled':
          Snackbar.show({
            text: 'offer disabled successfully',
            pos: 'top-right',
            actionTextColor: '#fff',
            backgroundColor: '#8dbf42'
          });
          this.action='active'
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
