$(document).ready(function () {
$('.button-collapse').sideNav();
//lendo o json para os combos
    getJSON();
//controle dos botoes 
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
   $("#frm_curso").submit(function () {
       var json = '"id": "'+$("#id").val()+'", "curso": "'+$("#curso").val()+'", "sigla": "'+$("#sigla").val()+'"';
       if( $("#nome").val() === '' || $("#sigla").val() === ''){
           swal('Ops', 'Preencha todos os dados', 'info');
           return false;
       }else{
           
           console.log(json);
            cadastrar(json);
       }
        return false;
    });
   

});
function getJSON( act ){
  var url   = window.location.search.replace("?", "");
 
  //MODO EDICAO OU DELETE
  if( url.indexOf("del") > -1 || url.indexOf("up") > -1 ){
      $.getJSON("http://localhost/tcs/adm/assets/js/curso_individual.json", function(data) {
          $("#curso").val(data.nome);
          $("#sigla").val(data.sigla);
          $("#id").val(data.id);
      });
  }
  //SE FOR DIFERENTE DE CAD EH LISTAR
  else if( url.indexOf("cad") > -1 == false)
  {
  $.getJSON("http://localhost/tcs/adm/assets/js/curso.json", function(data) {
    var d = data.curso;
    var saida = "";
    for (j = 0; j < d.length; j++) {
              saida += ' <tr> ';
              saida +='<td>'+d[j].nome+ '</td>'
              saida +='<td>'+d[j].sigla+'</td>';
              saida +='<td>';
              saida +='<a href="crud_curso.html?id='+d[j].id+'&act=up" class="btn-floating green"><i class="material-icons">edit</i></a>';
              saida +='<a  href="crud_curso.html?id='+d[j].id+'&act=del"  class="btn-floating red""><i class="material-icons">delete</i></a>';
              saida +='</td>';
              saida +='</tr>';
          }


        document.getElementById('cursos').innerHTML = saida;
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
                              swal("Opss!", "Cadastro realizado com sucesso","success" );
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
