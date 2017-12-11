$(document).ready(
		function() {
			$('.button-collapse').sideNav();
			$('select').material_select();

			getJSON();
			controleBotoes();

			// clica do deletar que chamao o ajax passando o ID
			$("#btn_deletar").click(function() {
				var id = $('#id').val();
				var dados = '{"id": "' + id + '" }';
				console.log(dados);
				deletar(dados);
				return false;
			});
			// cadastro
			$("#frm_agenda").submit(
					function() {
						
						var json = {
								"id": $("#id").val(),
								"tipo": $("#tipo").val(),
								"dificuldade": $("#dificuldade").val(),
								"nome": $("#titulo").val(),
								"dataEntrega": $("#dataEntrega").val(),
								"turma": {
									"id": $("#turma").val()
								}
						}

						if ($("#tipo").val() === ''
							|| $("#dificuldade").val() === ''
							|| $("#titulo").val() === ''
							|| $("#dataEntrega").val() === ''
							|| $("#duracao").val() === ''
							|| $("#turma").val() === '') {
							swal('Ops', 'Preencha todos os dados', 'info');
							return false;
						} else {
							cadastrar(json);
						}
						return false;
					});

		});

function getJSON() {
	var url = window.location.search.replace("?", "");

	// MODO EDICAO OU DELETE
	if (url.indexOf("del") > -1 || url.indexOf("up") > -1) {
		var url = new URL(window.location.href);
		var urlId = url.searchParams.get("id");
		$.getJSON(
			"http://localhost:8080/projeto-tcs/resources/avaliacoes/avaliacao?id=",
			function(data) {
				console.log(data)
				$("#titulo").val(data.nome);
				$("#dataEntrega").val(data.dataEntrega);
				$("#turma").val(data.turma.disciplina.nome + ' ' + data.turma.semestre + data.turma.turno);
				$("#id").val(data.id);
				$('#tipo').val(data.tipo);
				$('#dificuldade').val(data.dificuldade);
				window.document.getElementById("tipo").value = data.tipo;
				window.document.getElementById("dificuldade").value = data.dificuldade;
				comboxSelecionado(data.disciplina.id);
			});
	}
	// SE FOR DIFERENTE DE CAD EH LISTAR
	else if (url.indexOf("cad") > -1 == false) {
		$.getJSON(
			"http://localhost:8080/projeto-tcs/resources/avaliacoes",
			function(data) {
				var d = data;
				var saida = "";
	
				for (j = 0; j < d.length; j++) {
					saida += ' <tr> ';
					saida += '<td>' + d[j].tipo + '</td>';
					saida += '<td>' + d[j].dificuldade + '</td>';
					saida += '<td>' + d[j].disciplina + '</td>';
					saida += '<td>' + d[j].professor + '</td>';
					saida += '<td>' + d[j].dataEntrega + '</td>';
					saida += '<td>' + d[j].duracao + '</td>';
						
					saida += '<td>';
					saida += '<a href="crud_agenda.html?id='
							+ d[j].id
							+ '&act=up" class="btn-floating green"><i class="material-icons">edit</i></a>';
					saida += '<a  href="crud_agenda.html?id='
							+ d[j].id
							+ '&act=del"  class="btn-floating red" "><i class="material-icons">delete</i></a>';
					saida += '</td>';
					saida += '</tr>';
				}
				
				document.getElementById('agendas').innerHTML = saida;
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

	$.ajax({
		url : 'http://localhost:8080/projeto-tcs/resources/avaliacoes',
		type : 'POST',
		contentType : "application/json",
		data : dados

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
				text : "Está ação ira deletar o item selecionado!",
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

									}).always(function(resposta) {
								if (resposta === true) {
									window.location = "http://localhost:8080/projeto-tcs/index.html";
									return false;
								}
								if (resposta === 'error') {
									swal("Opss!", "Tente mais tarde", "info");
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

function comboxSelecionado(idDisciplina='') {

	$.getJSON("http://localhost:8080/projeto-tcs/resources/disciplinas",
			function(data) {
				for (i = 0; i < data.length; i++) {
					$('select').material_select();
					if (idDisciplina.valueOf() === data[i].id) {
						$('select[name="disciplina"]')
								.append(
										"<option selected value=\""
												+ data[i].id + "\">"
												+ data[i].nome
												+ "</option>");
					} else {
						$('select[name="disciplina"]').append(
								"<option  value=\"" + data[i].id
										+ "\">" + data[i].nome
										+ " </option>");
					}
				}

			});

}
