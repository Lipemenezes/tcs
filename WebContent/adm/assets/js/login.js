$('document').ready(function(){
 
	$("#btnLogin").click(function(event){
		$.ajax({
			type : 'POST',
			url  : 'http://localhost:8080/projeto-tcs/FiltroLogin',
			data : dados,
			dataType: 'json',
			beforeSend: function()
			{	
				$("#btnLogin").html('Validando acesso');
			},
			success :  function(response){						
				if(response.codigo == "1"){	
					$("#btnLogin").html('Login');
					$("#login-alert").css('display', 'none')
					window.location.href = "http://localhost:8080/projeto-tcs/adm/list_agenda.html";
				}if(response.codigo == "2"){	
					$("#btnLogin").html('Login');
					$("#login-alert").css('display', 'none')
					window.location.href = "http://localhost:8080/projeto-tcs/adm/list_agenda.html";
				}if(response.codigo == "3"){	
					$("#btnLogin").html('Login');
					$("#login-alert").css('display', 'none')
					window.location.href = "http://localhost:8080/projeto-tcs/adm/index.html";
				}
				else{			
					$("#btnLogin").html('btnLoginLogin');
					$("#login-alert").css('display', 'block')
					$("#mensagem").html('<strong>Erro! Contate o suporte </strong>' + response.mensagem);
				}
		    }
		});
	});
 
});