$(document).ready(
		function() {
			$('.button-collapse').sideNav();
			getCOMBO();
			// lendo o json para os combos
			getJSON();
			// controle dos botoes
			controleBotoes();

			// clica do deletar que chamao o ajax passando o ID
			$("#btn_deletar").click(function() {
				var id = $('#id').val();
				var dados = {
						"id": id
				}
				console.log(dados);
				deletar(dados);
				return false;
			});
			// cadastro
			$("#frm_turma").submit(
					function() {

						var json = {
								"id": $("#id").val(),
								"semestre": $("#semestre").val(),
								"turno": $("#turno").val(),
								"disciplina": {
									"id": $("#disciplina").val()
								},
								"usuarios": []
						}
						
						$.each($('#alunos').val(), function(k, v) {
							json.usuarios.push({'id': v})
						});
						
						if ($("#semestre").val() === ''
								|| $("#turno").val() === ''
								|| $("#disciplina").val() === ''
								|| $("#alunos").val() === '') {
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
	var urlx = new URL(window.location.href);
    var urlId = urlx.searchParams.get("id");
	if (url.indexOf("del") > -1 || url.indexOf("up") > -1) {
		$.getJSON("http://localhost:8080/projeto-tcs/resources/turmas/turma?id=" + urlId,
				function(data) {
					$("#semestre").val(data.nome);
					$("#turno").val(data.sobrenome);
					$("#disciplina").val(data.disciplina.id);
					$("#professor").val(data.disciplina.professor.id);
					$("#id").val(data.id);
				});
	}
	// SE FOR DIFERENTE DE CAD EH LISTAR
	else if (url.indexOf("cad") > -1 == false) {
		$
				.getJSON(
						"http://localhost:8080/projeto-tcs/resources/turmas",
						function(data) {
							var prof = data;
							var saida = "";

							for (j = 0; j < prof.length; j++) {
								saida += ' <tr> ';
								saida += '<td>' + data[j].semestre + '</td>';
								saida += '<td>' + data[j].turno + '</td>';
								saida += '<td>' + data[j].disciplina.nome + '</td>';
								saida += '<td>' + data[j].disciplina.professor.nome + '</td>';
								saida += '<td>' + data[j].disciplina.curso.nome + '</td>';
								saida += '<td>';
								saida += '<a href="crud_turma.html?id='
										+ data[j].id
										+ '&act=up" class="btn-floating green"><i class="material-icons">edit</i></a>';
								saida += '<a  href="crud_turma.html?id='
										+ data[j].id
										+ '&act=del"  class="btn-floating red" prof="'
										+ data[j].id
										+ '"><i class="material-icons">delete</i></a>';
								saida += '</td>';
								saida += '</tr>';
							}
							document.getElementById('turmas').innerHTML = saida;
						});
	}

}

function getCOMBO(idDisciplina='default', idProfessor='default') {
	$.getJSON("http://localhost:8080/projeto-tcs/resources/disciplinas", function(
			data) {
		var c = data;

		if (idDisciplina === '')
			$('select[name="disciplina"]').append(
					"<option  value=\"\">Selecione um curso</option>");

		for (i = 0; i < c.length + 1; i++) {
			$('select').material_select();

			if (idDisciplina.valueOf() !== '') {
				if (idDisciplina.valueOf() === c[i].id) {
					$('select[name="disciplina"]').append(
							"<option selected value=\"" + c[i].id + "\">"
									+ c[i].nome + "</option>");
				} else {
					$('select[name="disciplina"]').append(
							"<option  value=\"" + c[i].id + "\">" + c[i].nome
									+ "</option>");
				}
			} else {
				$('select[name="disciplina"]').append(
						"<option  value=\"" + c[i].id + "\">" + c[i].nome
								+ "</option>");
			}

		}

	});

	$.getJSON("http://localhost:8080/projeto-tcs/resources/usuarios/alunos", function(
			data) {
		if (idProfessor === '')
			$('select[name="alunos"]').append(
					"<option  value=\"\">Selecione os alunos</option>");
		for (i = 0; i < data.length + 1; i++) {
			if (idProfessor.valueOf() !== '') {
				$('select').material_select();
				if (idProfessor.valueOf() === data[i].id) {
					$('select[name="alunos"]').append(
							"<option selected value=\"" + data[i].id
									+ "\">" + data[i].nome
									+ "</option>");
				} else {

					$('select[name="alunos"]')
							.append(
									"<option  value=\"" + data[i].id
											+ "\">" + data[i].nome
											+ " " + data[i].sobrenome
											+ "</option>");

				}
			} else {
				$('select').material_select();
				$('select[name="alunos"]').append(
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
	delete dados.id;
	$.ajax({
		url : 'http://localhost:8080/projeto-tcs/resources/turmas',
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
				text : "Está ação ira deletar o contato de emergência",
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
										url : 'http://localhost:8080/projeto-tcs/resources/turmas',
										type : 'DELETE',
										contentType : "application/json",
										data : JSON.stringify(dados)

									})
							.always(
									function(resposta) {

										if (resposta === true) {
											window.location = "http://localhost:8080/projeto-tcs/index.html";
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
