$(document).ready(function() {
			$('.button-collapse').sideNav();
			// lendo combo
			getCOMBO()
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
			$("#frm_disciplina").submit(
					function() {

						var json = {
							"id": $("#id").val(),
							"nome": $("#disciplina").val(),
							"acronimo": $("#sigla").val(),
							"curso": {
								"id": $("#curso").val()
							},
							"professor": {
								"id": $("#professor").val()
							}
						}
						
						if ($("#curso").val() === ''
								|| $("#professor").val() === ''
								|| $("#disciplina").val() === '') {
							swal('Ops', 'Preencha todos os dados', 'info');
							return false;
						} else {
							console.log(json);
							 cadastrar(json);
						}
						return false;
					});

});
function getJSON(act) {
	var url = window.location.search.replace("?", "");

	// MODO EDICAO OU DELETE
	if (url.indexOf("del") > -1 || url.indexOf("up") > -1) {
		var url = new URL(window.location.href);
		var urlId = url.searchParams.get("id");
		$.getJSON(
				"http://localhost:8080/projeto-tcs/resources/disciplinas/disciplina?id="
						+ urlId, function(data) {
					$("#disciplina").val(data.nome);
					$("#id").val(data.id);
					$("#curso").val(data.curso.id);
					$("#professor").val(data.id);
					getCOMBO(data.idCurso, data.idProfessor);

				});
	}
	// SE FOR DIFERENTE DE CAD EH LISTAR
	else if (url.indexOf("cad") > -1 == false) {
		$
				.getJSON(
						"http://localhost:8080/projeto-tcs/resources/disciplinas",
						function(data) {
							var d = data;
							var saida = "";

							for (j = 0; j < d.length; j++) {
								saida += ' <tr> ';
								saida += '<td>' + d[j].nome + ' </td>';
								saida += '<td>' + d[j].professor.nome + ' </td>';
								saida += '<td>' + d[j].curso.nome + ' </td>';
								saida += '<td>';
								saida += '<a href="crud_disciplina.html?id='
										+ d[j].id
										+ '&act=up" class="btn-floating green"><i class="material-icons">edit</i></a>';
								saida += '<a  href="crud_disciplina.html?id='
										+ d[j].id
										+ '&act=del"  class="btn-floating red" "><i class="material-icons">delete</i></a>';
								saida += '</td>';
								saida += '</tr>';
							}
							document.getElementById('disciplinas').innerHTML = saida;
						});

	}

}
function getCOMBO(idCurso='default', idProfessor='default') {
	$.getJSON("http://localhost:8080/projeto-tcs/resources/cursos", function(
			data) {
		var c = data;

		if (idCurso === '')
			$('select[name="curso"]').append(
					"<option  value=\"\">Selecione um curso</option>");

		for (i = 0; i < c.length + 1; i++) {
			$('select').material_select();

			if (idCurso.valueOf() !== '') {
				if (idCurso.valueOf() === c[i].id) {
					$('select[name="curso"]').append(
							"<option selected value=\"" + c[i].id + "\">"
									+ c[i].nome + "</option>");
				} else {
					$('select[name="curso"]').append(
							"<option  value=\"" + c[i].id + "\">" + c[i].nome
									+ "</option>");
				}
			} else {
				$('select[name="curso"]').append(
						"<option  value=\"" + c[i].id + "\">" + c[i].nome
								+ "</option>");
			}

		}

	});

	$.getJSON("http://localhost:8080/projeto-tcs/resources/usuarios/professores", function(
			data) {
		if (idProfessor === '')
			$('select[name="professor"]').append(
					"<option  value=\"\">Selecione um professor</option>");
		for (i = 0; i < data.length + 1; i++) {
			if (idProfessor.valueOf() !== '') {
				$('select').material_select();
				if (idProfessor.valueOf() === data[i].id) {
					$('select[name="professor"]').append(
							"<option selected value=\"" + data[i].id
									+ "\">" + data[i].nome
									+ "</option>");
				} else {

					$('select[name="professor"]')
							.append(
									"<option  value=\"" + data[i].id
											+ "\">" + data[i].nome
											+ " " + data[i].sobrenome
											+ "</option>");

				}
			} else {
				$('select').material_select();
				$('select[name="professor"]').append(
						"<option  value=\"" + data[i].id + "\">"
								+ data[i].nome + " "
								+ data[i].sobrenome + "</option>");

			}
		}

	});
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

	$.ajax({
		url : 'http://localhost:8080/projeto-tcs/resources/disciplinas',
		type : 'POST',
		contentType : "application/json",
		data : JSON.stringify(dados)

	}).always(function(resposta) {

		if (resposta.id) {
			swal("OPa!", "Cadastro realizado com sucesso", "success");
			return false;
		}
		if (resposta === 'error') {
			swal("Ops!", "obtivemos um erro", "error");
			return false;
		}

	});
}
function deletar(dados) {

	swal(
			{
				title : "Você tem certeza?",
				text : "Está ação ira deletar a disciplina selecionada",
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
										url : 'http://localhost:8080/projeto-tcs/resources/disciplinas',
										type : 'DELETE',
										contentType : "application/json",
										data : dados

									})
							.always(
									function(resposta) {

										if (resposta === true) {
											window.location = "http://localhost:8080/projeto-tcs/adm/list_disciplina.html";
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
