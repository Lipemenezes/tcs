$(document)
		.ready(
				function() {
					$('.button-collapse').sideNav();
					$('select').material_select();
					// lendo o json para os combos
					getJSON();
					// controle dos botoes
					controleBotoes();

					// clica do deletar que chamao o ajax passando o ID
					$("#btn_deletar").click(function() {
						var dados = {
							"id" : $('#id').val()
						}
						console.log(dados);
						deletar(dados);
						return false;
					});

					// cadastro
					$("#frm_usuario")
							.submit(
									function() {
										var json = {
											"id" : $("#id").val(),
											"nome" : $("#nome").val(),
											"sobrenome" : $("#sobrenome").val(),
											"senha" : $("#senha").val(),
											"email" : $("#email").val(),
											"cpf" : $("#cpf").val(),
											"permissao" : {
												"id" : document
														.querySelectorAll('input[type=radio]:checked')[0].value
											}
										}

										if ($("#nome").val() === ''
												|| $("#email").val() === ''
												|| $("#sobrenome").val() === ''
												|| $("#cpf").val() === ''
												|| $("#nivel").val() === ''
												| $("#senha").val() === '') {
											swal('Ops',
													'Preencha todos os dados',
													'info');
											return false;
										} else {
											console.log(json);
											cadastrar(json);
										}
										return false;
									});

				});

function getJSON() {
	var url = window.location.search.replace("?", "");
	var xurl = new URL(window.location.href);
	var urlId = xurl.searchParams.get("id");
	// MODO EDICAO OU DELETE
	if (url.indexOf("del") > -1 || url.indexOf("up") > -1) {
		$
				.ajax(
						{
							url : 'http://localhost:8080/projeto-tcs/resources/usuarios/usuario?id='
									+ urlId,
							type : 'GET'
						}).always(function(data) {
					$("#nome").val(data.nome);
					$("#sobrenome").val(data.sobrenome);
					$("#senha").val(data.senha);
					$("#email").val(data.email);
					$("#cpf").val(data.cpf);
					$("#id").val(data.id);
					console.log(data.nivel);
					switch (data.permissao.id) {
					case 3:
						$("#adm").prop("checked", true);
						break;
					case 2:
						$("#prof").prop("checked", true);
						break;
					case 1:
						$("#aluno").prop("checked", true);
						break;
					}
				});
	}
	// SE FOR DIFERENTE DE CAD EH LISTAR
	else if (url.indexOf("cad") > -1 == false) {
		$
				.getJSON(
						"http://localhost:8080/projeto-tcs/resources/usuarios/",
						function(data) {
							var d = data;
							var saida = "";

							for (j = 0; j < d.length; j++) {
								saida += ' <tr> ';
								saida += '<td>' + data[j].nome + ' '
										+ data[j].sobrenome + '</td>'
								saida += '<td>' + data[j].cpf + '</td>'
								saida += '<td>' + data[j].email + '</td>'
								saida += '<td>' + data[j].permissao.nome
										+ '</td>'
								saida += '<td>';
								saida += '<a href="crud_usuario.html?id='
										+ data[j].id
										+ '&act=up" class="btn-floating green"><i class="material-icons">edit</i></a>';
								saida += '<a  href="crud_usuario.html?id='
										+ data[j].id
										+ '&act=del"  class="btn-floating red" "><i class="material-icons">delete</i></a>';
								saida += '</td>';
								saida += '</tr>';
							}
							document.getElementById('usuarios').innerHTML = saida;
						});
	}
}

function controleBotoes() {
	// controlando os botes de edit, cadastrar, delete via url
	var url = window.location.search.replace("?", "");
	if (url.indexOf("del") > -1) {
		$('#btn_deletar').css("display", "inherty");
		$('#btn_cadastrar').css("display", "none");
		$('#btn_editar').css("display", "none");
	} else if (url.indexOf("up") > -1) {
		$('#btn_deletar').css("display", "none");
		$('#btn_cadastrar').css("display", "none");
		$('#btn_editar').css("display", "inherty");
	} else {
		$('#btn_deletar').css("display", "none");
		$('#btn_cadastrar').css("display", "inherty");
		$('#btn_editar').css("display", "none");
	}
}
function cadastrar(dados) {
	delete dados.id;
	$.ajax({
		url : 'http://localhost:8080/projeto-tcs/resources/usuarios/',
		type : 'POST',
		contentType : "application/json",
		data : JSON.stringify(dados)
	}).always(function(resposta) {

		if (resposta.id) {
			swal("OPa!", "Cadastro realizado com sucesso", "success");
			return false;
		}
		if (resposta === 'error') {
			swal("Ops!", "Contate o suporte", "error");
			return false;
		}
	});

}
function deletar(dados) {

	swal(
			{
				title : "Você tem certeza?",
				text : "Está ação ira deletar o usuário",
				type : "warning",
				showCancelButton : true,
				confirmButtonColor : "#DD6B55",
				confirmButtonText : "Sim, Tenho certeza!",
				cancelButtonText : "Não, deixa pra lá!",
				closeOnConfirm : false,
				closeOnCancel : false,
				showLoaderOnConfirm : true
			},
			function(isConfirm) {
				if (isConfirm) {
					$
							.ajax(
									{
										url : 'http://localhost:8080/projeto-tcs/resources/usuarios/',
										type : 'DELETE',
										contentType : "application/json",
										data : JSON.stringify(dados)
									})
							.always(
									function(resposta) {

										if (resposta === true) {
											window.location = "http://localhost:8080/projeto-tcs/adm/list_usuario.html";
											return false;
										}
										if (resposta === 'error') {
											swal(
													"Opss!",
													"Cadastro realizado com sucesso",
													"success");
											return false;
										}
									});
				} else {
					swal({
						title : "Opa",
						text : "Dados mantidos com sucesso.",
						type : "success",
						showCancelButton : false,
						confirmButtonColor : "green",
						confirmButtonText : "Ok, Obrigado!",
						closeOnConfirm : false,
						closeOnCancel : false,
						showLoaderOnConfirm : true
					});

				}
			});

}
