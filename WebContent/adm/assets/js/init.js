$(document).ready(function () {
    $('.button-collapse').sideNav();
    $('select').material_select();
     
    myJSON();
});


function myJSON(){
  $.getJSON("http://localhost:8080/projeto-tcs/resources/disciplinas", function(data) {
  var disciplinas = data.disciplina;
   $('select[name="disciplina"]').append("<option  value=\"\">Selecione uma disciplina</option>");
  for (i = 0; i < disciplinas.length; i++) {
     $('select').material_select();      
     $('select[name="disciplina"]').append("<option  value=\"" + disciplinas[i].id + "\">" + disciplinas[i].nome + "</option>");
  }

 });
  
  
  //fazer pegar só professores
  $.getJSON("http://localhost:8080/projeto-tcs/resources/usuarios", function(data) {
  $('select[name="professor"]').append("<option  value=\"\">Selecione um(a) professor(a)</option>");
  for (i = 0; i < data.professor.length+1; i++) {
         $('select').material_select();
         $('select[name="professor"]').append("<option  value=\"" + data.professor[i].id + "\">" + data.professor[i].nome +" "+ data.professor[i].sobrenome+ "</option>");
      
  }
  
 });
}
