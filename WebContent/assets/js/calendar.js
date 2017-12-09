

$(document).ready(function () {
	var events = [];
	$.getJSON("http://localhost:8080/projeto-tcs/resources/avaliacoes", function(data) {
		for (i = 0; i < data.length; i++) {
			events.push({
				"id": data[i].id,
				"start": data[i].dataEntrega,
				"title": data[i].nome
			});  
		}
		
		myJSON();
	    $('.parallax').parallax();
	    $('.modal').modal();
	    $('select').material_select();
	    
	    var diaSemana = ['Domingo', 'Segunda-Feira', 'Terca-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sabado'];
	    var mesAno = ['Janeiro', 'Fevereiro', 'Marco', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
	    var data = new Date();
	    var hoje = diaSemana[data.getDay()] + ', ' + mesAno[data.getMonth()] + ' de ' + data.getFullYear();
	    
	    $("#dataPesquisa").attr("value", hoje);
	    
	    getCalendar(".datepickerFim", mesAno, diaSemana, data);
	    

	    $("#dataPesquisa").click(function (event) {
	        event.stopPropagation();
	        $(".datepicker").first().pickadate("picker").open();
	    });
	    
	    $('#calendar').fullCalendar({
	        dayClick: function () {
	            $('#modal1').modal('open');
	            var  data = ($(this).data('date'));
	            var d = new Date(data);
	            var dia=d.getDate()+1;
	            var mes=d.getMonth()+1;
	             if(dia === 32 )
	                 dia = 1;
	            var ano=d.getFullYear();
	           $("#dtIn").val(dia + '/' + (mes++) + '/' + ano);
	            
	        },
	        header: {
	            left: 'prev,next today',
	            center: 'title',
	            right: ''
	        },
	        defaultDate: data,
	        navLinks: false,
	        editable: true,
	        eventLimit: false,
	        events: events
	    });

	   $('#frm_root').submit(function () {
	        var id =  $("#id").val()? $("#titulo").val() : '';
	        var titulo = $("#titulo").val();
	        var turma = $("#turma").val();
	        var tipo = $("#tipo").val();
	        var dataEntrega = $("#dataEntrega").val().split("/").reverse().join("-");;
	        var dificuldade = $("#dificuldade").val();
	        var duracao = $('#duracao').val();
	      
	        if( tipo === '' ||tipo === null ){ valida("Tipo");  return false;}
	        if( dificuldade === ''||dificuldade === null ){ valida("Dificuldade"); return false;}
	        if( turma === ''|| turma === null ){ valida("Turma");return false;}
	        if( titulo === ''||titulo === null ){ $("#titulo").focus();  valida("Titulo do Trabalho"); return false;}
	        if( dataEntrega === ''||dataEntrega === null ){ $("#dataEntrega").focus(); valida("Data de entrega");  return false;}
	        if( duracao === ''||duracao === null ){$("#duracao").focus();  valida("Detalhe");  return false;}
	        
	        var json = {
	        		"id": id,
	        		"nome": titulo,
	        		"turma": {
	        			"id": turma
	        		},
	        		"tipo": tipo,
	        		"dataEntrega": dataEntrega,
	        		"dificuldade": dificuldade,
	        		"duracao": duracao
	        }

	    $.ajax({
	        url: 'http://localhost:8080/projeto-tcs/resources/avaliacoes/',
	        type: 'POST',
	        contentType: "application/json",
	        data: JSON.stringify(json)

	    }).always(function (resposta) {

	        if (resposta === true) {
	        	swal("Opa!", "Cadastro relizado com sucesso", "success");
	            $('#frm_root')[0].reset();
	        } else {
	        	swal("Opss!", "Não foi possível cadastrar", "info");
	        }
	  
	      });
	      return false;
	    });
	    
	     $("#btnFechar").click( function(){
	     $('#frm_root')[0].reset();
	     });
	});

});


function getCalendar(ID, mesAno, diaSemana, data){
     $(ID).pickadate({
        monthsFull: mesAno,
        monthsShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
        weekdaysFull: diaSemana,
        weekdaysShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
        weekdaysLetter: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
        selectMonths: true,
        selectYears: true,
        clear: false,
        format: 'dd/mm/yyyy',
        today: "Hoje",
        close: "X",
        min: new Date(data.getFullYear() - 1, 0, 1),
        max: new Date(data.getFullYear() + 1, 11, 31),
        closeOnSelect: true
    });
    
  
}
function valida(tipo){
    swal("Opss!"," O campo [ "+tipo+" ] deve ser selcionado ou preenchido", "info");
  }
