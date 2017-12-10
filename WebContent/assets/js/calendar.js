var events = [];
var allEvents = [];
$(document).ready(
		function() {

			prepareCalendar();

			$('#filter-search-button').on('click', function() {
				prepareCalendar();
			});

			$('#frm_root').submit(
					function() {
						var id = $("#id").val() ? $("#id").val() : '';
						var titulo = $("#titulo").val();
						var turma = $("#turma").val();
						var tipo = $("#tipo").val();
						var dataEntrega = $("#dataEntrega").val().split("/")
								.reverse().join("-");
						;
						var dificuldade = $("#dificuldade").val();
						var duracao = $('#duracao').val();

						if (tipo === '' || tipo === null) {
							valida("Tipo");
							return false;
						}
						if (dificuldade === '' || dificuldade === null) {
							valida("Dificuldade");
							return false;
						}
						if (turma === '' || turma === null) {
							valida("Turma");
							return false;
						}
						if (titulo === '' || titulo === null) {
							$("#titulo").focus();
							valida("Titulo do Trabalho");
							return false;
						}
						if (dataEntrega === '' || dataEntrega === null) {
							$("#dataEntrega").focus();
							valida("Data de entrega");
							return false;
						}
						if (duracao === '' || duracao === null) {
							$("#duracao").focus();
							valida("Detalhe");
							return false;
						}

						var json = {
							"id" : id,
							"nome" : titulo,
							"turma" : {
								"id" : turma
							},
							"tipo" : tipo,
							"dataEntrega" : dataEntrega,
							"dificuldade" : dificuldade,
							"duracao" : duracao
						}

						saveOrUpdate(json);
						return false;
					});

		});

function saveOrUpdate(json) {

	var okay = false;
	$.ajax({
		url : 'http://localhost:8080/projeto-tcs/resources/avaliacoes/',
		type : 'POST',
		contentType : "application/json",
		data : JSON.stringify(json)
	}).always(function(data) {
		if (data.id) {
			okay = true;
			swal("Opa!", "Cadastro relizado com sucesso", "success");

			$('#id').val(data.id);

			var event = {
				"id" : data.id,
				"start" : data.dataEntrega,
				"title" : data.nome
			};
			events.push(event);

			var newDate = new Date()
			newDate.setTime(data.dataEntrega);
			newDate = moment(newDate).format('DD/MM/YYYY')

			allEvents[data.id] = {
				"id" : data.id,
				"dataEntrega" : newDate,
				"nome" : data.nome,
				"duracao" : data.duracao,
				"dificuldade" : data.dificuldade,
				"tipo" : data.tipo,
				"turma" : {
					"id" : data.turma.id ? data.turma.id : data.turma
				}
			};
			$('#calendar').fullCalendar('removeEvents', json.id);
			$('#calendar').fullCalendar('renderEvent', event, true)

		} else {
			swal("Opss!", "Não foi possível cadastrar", "info");
		}

	});
	return okay;
}

function getCalendar(ID, mesAno, diaSemana, data) {
	$(ID).pickadate(
			{
				monthsFull : mesAno,
				monthsShort : [ 'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
						'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez' ],
				weekdaysFull : diaSemana,
				weekdaysShort : [ 'Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex',
						'Sab' ],
				weekdaysLetter : [ 'D', 'S', 'T', 'Q', 'Q', 'S', 'S' ],
				selectMonths : true,
				selectYears : true,
				clear : false,
				format : 'dd/mm/yyyy',
				today : "Hoje",
				close : "X",
				min : new Date(data.getFullYear() - 1, 0, 1),
				max : new Date(data.getFullYear() + 1, 11, 31),
				closeOnSelect : true
			});

}

function prepareCalendar() {
	$('#calendar').fullCalendar('destroy')
	events = [];
	allEvents = [];
	// var startDate =
	// $('#filter-start-date').val().split('/').reverse().join('-')
	// var endDate = $('#filter-end-date').val().split('/').reverse().join('-')
	var disciplinaId = $('#filter-disciplina').val();

	// if (!startDate) startDate = null;
	// if (!endDate) endDate = null;
	if (!disciplinaId)
		disciplinaId = '';

	$('#btn_deletar').on('click', function() {
		apagar();
	});

	$
			.getJSON(
					"http://localhost:8080/projeto-tcs/resources/avaliacoes?disciplina="
							+ disciplinaId,
					function(data) {
						for (i = 0; i < data.length; i++) {
							events.push({
								"id" : data[i].id,
								"start" : data[i].dataEntrega,
								"title" : data[i].nome
							});

							allEvents[data[i].id] = {
								"id" : data[i].id,
								"dataEntrega" : data[i].dataEntrega,
								"nome" : data[i].nome,
								"duracao" : data[i].duracao,
								"dificuldade" : data[i].dificuldade,
								"tipo" : data[i].tipo,
								"turma" : {
									"id" : data[i].turma.id ? data[i].turma.id
											: data[i].turma
								}
							};
						}

						$('.parallax').parallax();
						$('.modal').modal();
						$('select').material_select();

						var diaSemana = [ 'Domingo', 'Segunda-Feira',
								'Terca-Feira', 'Quarta-Feira', 'Quinta-Feira',
								'Sexta-Feira', 'Sabado' ];
						var mesAno = [ 'Janeiro', 'Fevereiro', 'Marco',
								'Abril', 'Maio', 'Junho', 'Julho', 'Agosto',
								'Setembro', 'Outubro', 'Novembro', 'Dezembro' ];
						var data = new Date();
						var hoje = diaSemana[data.getDay()] + ', '
								+ mesAno[data.getMonth()] + ' de '
								+ data.getFullYear();

						$("#dataPesquisa").attr("value", hoje);

						getCalendar(".datepickerFim", mesAno, diaSemana, data);

						$("#dataPesquisa").click(
								function(event) {
									event.stopPropagation();
									$(".datepicker").first()
											.pickadate("picker").open();
								});

						$('#calendar')
								.fullCalendar(
										{
											dayClick : function() {
												$('#id').val('');
												$('#frm_root')[0].reset();
												$('#modal-title').html(
														"Cadastrar");
												$('#btn_cadastrar').show();
												$('#btn_alterar').hide();
												$('#btn_deletar').hide();

												$('#modal1').modal('open');
												var data = ($(this)
														.data('date'));
												var d = new Date(data);
												var dia = d.getDate() + 1;
												var mes = d.getMonth() + 1;
												if (dia === 32)
													dia = 1;
												var ano = d.getFullYear();
												$("#dataEntrega").val(
														dia + '/' + (mes++)
																+ '/' + ano);

											},
											header : {
												left : 'prev,next today',
												center : 'title',
												right : ''
											},
											defaultDate : data,
											navLinks : false,
											editable : true,
											eventLimit : false,
											events : events,
											eventClick : function(calEvent,
													jsEvent, view) {
												$('#id').val('');
												$('#frm_root')[0].reset();
												$('#btn_cadastrar').hide();
												$('#btn_alterar').show();
												$('#btn_deletar').show();

												$('#modal-title').html(
														"Alterar")
												$('#modal1').modal('open');
												var id = calEvent.id;

												$('#id').val(id);
												$('#titulo').val(
														allEvents[id].nome);
												$('#tipo').val(
														allEvents[id].tipo);
												$('#dificuldade')
														.val(
																allEvents[id].dificuldade);
												$('#turma').val(
														allEvents[id].turma.id);
												$('#duracao').val(
														allEvents[id].duracao);
												$('#dataEntrega')
														.val(
																allEvents[id].dataEntrega
																		.split(
																				'-')
																		.reverse()
																		.join(
																				'/'));
											},
											eventDrop : function(event, delta,
													revertFunc) {
												allEvents[event.id].dataEntrega = event.start
														.format();
												if (saveOrUpdate(allEvents[event.id])) {
													return;
												} else {
													revertFunc();
												}
											}
										});

					});

}

function valida(tipo) {
	swal("Opss!",
			" O campo [ " + tipo + " ] deve ser selcionado ou preenchido",
			"info");
}

function apagar() {

	var json = {
		"id" : $('#id').val()
	}

	$.ajax({
		url : 'http://localhost:8080/projeto-tcs/resources/avaliacoes/',
		type : 'DELETE',
		contentType : "application/json",
		data : JSON.stringify(json)

	}).always(function(resposta) {

		if (resposta === true) {
			swal("Opa!", "Apagado com sucesso", "success");
			$('.modal').modal('close');
			$('#calendar').fullCalendar('removeEvents', $('#id').val());
		} else {
			swal("Opss!", "Não foi possível apagar", "info");
		}

	});

}
