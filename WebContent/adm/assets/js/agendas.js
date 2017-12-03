$(document).ready(function () {
    $('.button-collapse').sideNav();
    $('select').material_select();
      
    getJSON();
    controleBotoes();
    
//clica do deletar que chamao o ajax passando o ID
   $("#btn_deletar").click(function () {
         var id    = $('#id').val();
         var dados = '{"id": "'+id+'" }';
         console.log(dados);
         deletar(dados);
        return false;
    });
    //cadastro 
   $("#frm_agenda").submit(function () {
       var json = '{"id": "'+$("#id").val()+
               '","tipo": "'+$("#tipo").val()+
               '", "dificuldade": "'+$("#dificuldade").val()+
               '", "disciplina": "'+$("#disciplina").val()+
               '", "titulo": "'+$("#titulo").val()+
               '", "dataIn": "'+$("#dtIn").val()+
               '", "dataEn": "'+$("#dtEn").val()+
               '", "detalhe": "'+$("#detalhe").val()+
               '","professor": "'+$("#professor").val()+'"}';
       
       if( $("#tipo").val() === '' || $("#dificuldade").val() === '' ||  $("#dificuldade").val() === ''  ||
           $("#titulo").val() === ''|| $("#dtIn").val() === '' ||
           $("#dtEn").val() === ''|| $("#detalhe").val() === '' || $("#professor").val() === ''   ){
           swal('Ops', 'Preencha todos os dados', 'info');
           return false;
       }else{
           
         
           cadastrar(json);
       }
        return false;
    });
   
 
});


function getJSON(  ){
  var url   = window.location.search.replace("?", "");
 
  //MODO EDICAO OU DELETE
  if( url.indexOf("del") > -1 || url.indexOf("up") > -1 ){
      $.getJSON("http://localhost/tcs/adm/assets/js/item_da_agenda.json", function(data) {
        console.log(data)
          $("#titulo").val(data.titulo);
          $("#professor").val(data.professor);
          $("#dtIn").val(data.dataIn);
          $("#dtEn").val(data.dataEn);
          $("#detalhe").val(data.detalhe);
          $("#id").val(data.id);
          $('#tipo').val( data.tipo)
          window.document.getElementById("tipo").value = data.tipo;
          window.document.getElementById("dificuldade").value = data.dificuldade;
            comboxSelecionado(data.idProf, data.idDisciplina );
      });
  }
  //SE FOR DIFERENTE DE CAD EH LISTAR
  else if( url.indexOf("cad") > -1 == false)
  {
      $.getJSON("http://localhost/tcs/adm/assets/js/agenda.json", function(data) {
            var d = data.agenda;
             var saida = "";

            for (j = 0; j < d.length; j++) {
                  saida += ' <tr> ';
                  saida +='<td>'+d[j].tipo+'</td>';
                  saida +='<td>'+d[j].dificuldade+'</td>';
                  saida +='<td>'+d[j].disciplina+'</td>';
                  saida +='<td>'+d[j].professor+'</td>';
                  saida +='<td>'+d[j].dataIn+'</td>';
                  saida +='<td>'+d[j].dataEn+'</td>';
                  saida +='<td>'+d[j].detalhe.substring(0,20)+'[...]</td>';

                  saida +='<td>';
                  saida +='<a href="crud_agenda.html?id='+d[j].id+'&act=up" class="btn-floating green"><i class="material-icons">edit</i></a>';
                  saida +='<a  href="crud_agenda.html?id='+d[j].id+'&act=del"  class="btn-floating red" "><i class="material-icons">delete</i></a>';
                  saida +='</td>';
                  saida +='</tr>';
              }


            document.getElementById('agendas').innerHTML = saida;
           });
  }
  
}
function controleBotoes(){
         //controlando os botes de edit, cadastrar, delete via url
     var url   = window.location.search.replace("?", "");
     if(url.indexOf("del") > -1){
         $('#btn_deletar').css("display", "inherty");
         $('#btn_cadastrar').css("display", "none");
         $('#btn_editar').css("display", "none");
     }else if(url.indexOf("up") > -1){
         $('#btn_deletar').css("display","none");
         $('#btn_cadastrar').css("display", "none");
         $('#btn_editar').css("display", "inherty");
     }else{
         $('#btn_deletar').css("display","none");
         $('#btn_cadastrar').css("display", "inherty");
         $('#btn_editar').css("display", "none");
     }
}
function cadastrar( dados ){
     
  $.ajax({
    url:   'ajax/URL',
    type: 'POST',
    data:  dados

  }).always(function(resposta) {
       
       if( resposta === 'cadastrado'){
          swal("OPa!", "Cadastro realizado com sucesso","success" );
           return false;  
       } 
       if( resposta === 'error'){
          swal("Ops!", "obtivemos um erro","error" );
           return false;  
       } 
       
      
    
  });
}
function deletar (dados){
     
     swal({
            title: "Você tem certeza?",
            text: "Está ação ira deletar o contato de emergência",
            type: "warning",
             showCancelButton: true,
              confirmButtonColor: "#DD6B55",
              confirmButtonText: "Sim, Tenho certeza!",
              cancelButtonText: "Não, deixa pra lá!",
              closeOnConfirm: false,
              closeOnCancel: false,
              showLoaderOnConfirm: true
            },
                function(isConfirm){
                  if (isConfirm) {
                      $.ajax({
                        url:   'URL_PARA DELETAR PASAANDO O ID',
                        type: 'POST',
                        data:  dados

                      }).always(function(resposta) {

                           if( resposta === 'deleted'){
                               window.location = "URL_COMPLETA";
                               return false;  
                           }
                           if( resposta === 'error'){
                              swal("Opss!", "Tente mais tarde","info" );
                               return false;  
                           } 



                      });
                      
                    } else {
                   swal({
                                title: "Opa",
                                text: "Dados mantidos com sucesso.",
                                type: "success",
                                 showCancelButton: false,
                                  confirmButtonColor: "green",
                                  confirmButtonText: "Ok, Obrigado!",
                                  closeOnConfirm: false,
                                  closeOnCancel: false,
                                  showLoaderOnConfirm: true
                                }
                            );
                    
                  }
                });
              
}

function comboxSelecionado(idProf, idDisciplina){
    
    
    $.getJSON("http://localhost/tcs/adm/assets/js/professor.json", function(data) {
     for (i = 0; i < data.professor.length; i++) {
         $('select').material_select();
          if( idProf.valueOf() === data.professor[i].id ){
             $('select[name="professor"]').append("<option selected value=\"" + data.professor[i].id + "\">" + data.professor[i].nome + "</option>");
          }else{
            $('select[name="professor"]').append("<option  value=\"" + data.professor[i].id + "\">" + data.professor[i].nome +" "+ data.professor[i].sobrenome+ "</option>");
         }    
     }
  
 });
 $.getJSON("http://localhost/tcs/adm/assets/js/disciplina.json", function(data) {
   
     for (i = 0; i < data.disciplina.length; i++) {
         $('select').material_select();
          if( idDisciplina.valueOf() === data.disciplina[i].id ){
             $('select[name="disciplina"]').append("<option selected value=\"" + data.disciplina[i].id + "\">" + data.disciplina[i].nome + "</option>");
          }else{
            $('select[name="disciplina"]').append("<option  value=\"" + data.disciplina[i].id + "\">" + data.disciplina[i].nome +" </option>");
         }    
     }
  
 });
 

 
}
