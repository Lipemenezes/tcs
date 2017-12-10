$(document).ready(function () {
    $('.button-collapse').sideNav();
    $('select').material_select();
     
    myJSON();
});


function myJSON(){
  $.getJSON("http://localhost:8080/projeto-tcs/resources/disciplinas", function(data) {
  var disciplinas = data;
   $('select[name="disciplina"]').append("<option  value=\"\">Selecione uma disciplina</option>");
  for (i = 0; i < disciplinas.length; i++) {
     $('select').material_select();      
     $('select[name="disciplina"]').append("<option  value=\"" + disciplinas[i].id + "\">" + disciplinas[i].nome + "</option>");
  }

 });
  
  $.getJSON("http://localhost:8080/projeto-tcs/resources/usuarios/professores", function(data) {
  $('select[name="professor"]').append("<option  value=\"\">Selecione um(a) professor(a)</option>");
  for (i = 0; i < data.length; i++) {
         $('select').material_select();
         $('select[name="professor"]').append("<option  value=\"" + data[i].id + "\">" + data[i].nome +" "+ data[i].sobrenome+ "</option>");
      
  }
  
 });
  
  $.getJSON("http://localhost:8080/projeto-tcs/resources/turmas", function(data) {
	  $('select[name="professor"]').append("<option  value=\"\">Selecione uma turma</option>");
	  for (i = 0; i < data.length; i++) {
	         $('select').material_select();
	         $('select[name="turma"]').append("<option  value=\"" + data[i].id + "\">" + data[i].disciplina.nome +" - "+ data[i].semestre+" - "+data[i].turno + "</option>");
	      
	  }
	  
   });
  
  $.getJSON("http://localhost:8080/projeto-tcs/resources/disciplinas", function(data) {
	  $('select[name="filter-disciplina"]').append("<option  value=\"\">Selecione uma disciplina</option>");
	  for (i = 0; i < data.length; i++) {
	         $('select').material_select();
	         $('select[name="filter-disciplina"]').append("<option  value=\"" + data[i].id + "\">" + data[i].nome + "</option>");
	      
	  }
   });
}
