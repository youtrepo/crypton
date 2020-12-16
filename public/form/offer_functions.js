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
function offer_visible(id){
  $.ajax({
    type:"POST",
    url:"/offer_actions",
    data:{id:id,action:'delete'},
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
