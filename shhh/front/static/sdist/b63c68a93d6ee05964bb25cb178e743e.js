
$('#secretSender').on('submit',function(event){event.preventDefault();$.ajax({url:'/api/send',data:$('#secretSender').serialize(),type:'POST',success:function(d){console.log(d);var data=JSON.stringify(d);alert(data);alert(data.result);}});});