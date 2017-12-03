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
   $("#frm_professor").submit(function () {
       var json = '{"id": "'+$("#id").val()+'","first_name": "'+$("#first_name").val()+'", "password": "'+$("#password").val()+'", "email": "'+$("#email").val()+'","last_name": "'+$("#last_name").val()+'"}';
       if( $("#first_name").val() === '' || $("#password").val() === '' || $("#last_name").val() === ''|| $("#email").val() === ''){
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
      $.getJSON("http://localhost/tcs/adm/assets/js/professor_individual.json", function(data) {
          $("#first_name").val(data.nome);
          $("#last_name").val(data.sobrenome);
          $("#password").val(data.senha);
          $("#email").val(data.email);
          $("#id").val(data.id);
      });
  }
  //SE FOR DIFERENTE DE CAD EH LISTAR
  else if( url.indexOf("cad") > -1 == false)
  {
        $.getJSON("http://localhost/tcs/adm/assets/js/professor.json", function(data) {
         var prof = data.professor;
          var saida = "";

         for (j = 0; j < prof.length; j++) {
               saida += ' <tr> ';
               saida +='<td>'+prof[j].nome+' ' +prof[j].sobrenome+ '</td>'
               saida +='<td>'+prof[j].email+'</td>';
               saida +='<td>'+prof[j].telefone+'</td>';
               saida +='<td>';
               saida +='<a href="crud_professor.html?id='+prof[j].id+'&act=up" class="btn-floating green"><i class="material-icons">edit</i></a>';
               saida +='<a  href="crud_professor.html?id='+prof[j].id+'&act=del"  class="btn-floating red" prof="'+prof[j].id+'"><i class="material-icons">delete</i></a>';
               saida +='</td>';
               saida +='</tr>';
           }


         document.getElementById('professores').innerHTML = saida;
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
