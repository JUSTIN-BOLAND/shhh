
$('#secretSender').on('submit',function(event){event.preventDefault();$.ajax({url:'/api/send',data:$('#secretSender').serialize(),type:'POST',success:function(d){$('#linkPop').fadeIn(1000);$('#linkDetail').empty().append(window.location.hostname+'/read?secret='+d.result);$('#linkExpire').empty().append('2 days');}});});