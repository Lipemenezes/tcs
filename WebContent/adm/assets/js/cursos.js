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
        return false;    });
    //cadastro 
   $("#frm_curso").submit(function () {
       var json = {
    		   "id": $("#id").val(),
    		   "nome": $("#curso").val(),
    		   "acronimo": $("#sigla").val()
       }
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
	  var url = new URL(window.location.href);
	  var urlId = url.searchParams.get("id");
      $.getJSON("http://localhost:8080/projeto-tcs/resources/cursos/curso?id=" + urlId, function(data) {
          $("#curso").val(data.nome);
          $("#sigla").val(data.acronimo);
          $("#id").val(data.id);
      });
  }
  //SE FOR DIFERENTE DE CAD EH LISTAR
  else if( url.indexOf("cad") > -1 == false)
  {
  $.getJSON("http://localhost:8080/projeto-tcs/resources/cursos/", function(data) {
    var saida = "";
    for (j = 0; j < data.length; j++) {
              saida += ' <tr> ';
              saida +='<td>'+data[j].nome+ '</td>'
              saida +='<td>'+data[j].acronimo+'</td>';
              saida +='<td>';
              saida +='<a href="crud_curso.html?id='+data[j].id+'&act=up" class="btn-floating green"><i class="material-icons">edit</i></a>';
              saida +='<a  href="crud_curso.html?id='+data[j].id+'&act=del"  class="btn-floating red""><i class="material-icons">delete</i></a>';
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
	if (!dados["id"]) {
		delete dados['id'];
	}
	dados['ativo'] = true;
  $.ajax({
    url:  'http://localhost:8080/projeto-tcs/resources/cursos/',
    type: 'POST',
    contentType: "application/json",
    data:  JSON.stringify(dados)
  }).always(function(resposta) {
       if( resposta.id){
          swal("Opa!", "Cadastro realizado com sucesso","success" );
           return false;  
       } 
       if( resposta === 'error'){
          swal("Ops!", "Algo deu errado","error" );
           return false;  
       } 
  });
}

function deletar(dados){
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
                        url:   'http://localhost:8080/projeto-tcs/resources/cursos/',
                        type: 'DELETE',
                        contentType: "application/json",
                        data:  dados
                      }).always(function(resposta) {
                           if( resposta === true ){
                               window.location = "http://localhost:8080/projeto-tcs/adm/list_curso.html";
                               return false;  
                           }
                           if( resposta === 'error'){
                              swal("Opss!", "Algo deu errado","error" );
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
