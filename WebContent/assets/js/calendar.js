$(document).ready(function () {
    $('.parallax').parallax();
    $('.modal').modal();
    $('select').material_select();
    
    var diaSemana = ['Domingo', 'Segunda-Feira', 'Terca-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sabado'];
    var mesAno = ['Janeiro', 'Fevereiro', 'Marco', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    var data = new Date();
    var hoje = diaSemana[data.getDay()] + ', ' + mesAno[data.getMonth()] + ' de ' + data.getFullYear();
    
    $("#dataPesquisa").attr("value", hoje);
    
    getCalendar(".datepickerInicio", mesAno, diaSemana, data);
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
        navLinks: false, // can click day/week names to navigate views
        editable: true,
        eventLimit: false, // allow "more" link when too many events
       events: { // you can also specify a plain string like 'json/events.json'
                   url: 'http://localhost/tcs/adm/assets/js/agenda_itens.json',
		  error: function() {
		    $('#script-warning').show();
		 }
        }
    });


   $('#frm_root').submit(function () {
       
        var id =  $("#id").val()? $("#titulo").val() : 0;
        var titulo = $("#titulo").val();
        var detalhe = $("#detalhe").val();
        var professor = $("#professor").val();
        var disciplina = $("#disciplina").val();
        var tipo = $("#tipo").val();
        var dataIn = $("#dtIn").val();
        var dataEn = $("#dtEn").val();
        var dificuldade = $("#dificuldade").val();
      
        
        if( tipo === '' ||tipo === null ){ valida("Tipo");  return false;}
        if( dificuldade === ''||dificuldade === null ){ valida("Dificuldade"); return false;}
        if( disciplina === ''||disciplina === null ){ valida("Disciplina");return false;}
        if( professor === ''||professor === null ){ valida("Professor(a)");return false;} 
        if( titulo === ''||titulo === null ){ $("#titulo").focus();  valida("Titulo do Trabalho"); return false;}
        
        if( dataIn === ''||dataIn === null ){ $("#dtIn").focus(); valida("Data de Inicio");  return false;}
        if( dataEn === ''||dataEn === null ){ $("#dtEn").focus(); valida("Data de Fim");  return false;}
        if( detalhe === ''||detalhe === null ){$("#detalhe").focus();  valida("Detalhe");  return false;}
       /* 
        var dTi = dataIn.split("/");
        var dTs = dataEn.split("/");
       
       
    if(dTi[0] !== 31 ){
        console.log( (dTi[0].valueOf( )> dTs[0].valueOf() ));
        if( dTi[0].valueOf() >  dTs[0].valueOf() && dTi[1] === dTs[1]){
            $("#detalhe").focus(); 
            swal("Opss!", "Data de inicio não pode ser maior que a data final", "info");
            return false;
        }
    } */
        //preparar o json manualmente
        
        var json = '"id" : "'+id+'",'+    
                    '"titulo": "'+titulo+' ",'+
                    '"detalhe": "'+detalhe+'",'+
                    '"professor": "'+professor+'",'+
                    '"disciplina": "'+disciplina+'",'+
                    '"tipo": "'+tipo+'",'+
                    '"dataIn": "'+dataIn+'",'+
                    '"dataEn": "'+dataEn+'",'+
                    '"dificuldade": "'+dificuldade+'";';
 //*****************************************************************  
  console.log(json);
  return false; // tirar este return e o console acima
//******************************************************************
    $.ajax({
        url: 'A URL VAI AQUI',
        type: 'POST',
        data: json

    }).always(function (resposta) {

        switch (resposta)
        {
            case 'cadastrado':
                swal("Opa!", "Cadastro relizado com sucesso", "success");
                $('#frm_root')[0].reset();
                
                break;
            case 'email_existente':
                swal("Opss!", "Já existe um usuário cadastrado com este e-mail.", "info");
                break;


        }
      });
      return false;
    });
    
     $("#btnFechar").click( function(){
     $('#frm_root')[0].reset();
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
  
