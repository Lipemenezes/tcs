DROP DATABASE projeto_tcs;
CREATE DATABASE projeto_tcs;
USE projeto_tcs;

SELECT * FROM Usuario;

SELECT * FROM Permissao;

INSERT Usuario(id, ativo, cpf, dataCadastro, email, nome, senha, sobrenome, permissao_id)
	VALUES (1, true, "123.456.789-12", 05/12/2017, "aluno@gmail.com", "Aluno", "123", "Teste", 1);
    
INSERT Usuario(id, ativo, cpf, dataCadastro, email, nome, senha, sobrenome, permissao_id)
	VALUES (2, true, "144.456.789-74", 05/12/2017, "professor@gmail.com", "Professor", "321", "Teste", 2);
    
INSERT Usuario(id, ativo, cpf, dataCadastro, email, nome, senha, sobrenome, permissao_id)
	VALUES (3, true, "165.456.789-99", 05/12/2017, "admin@gmail.com", "Admin", "123", "Teste", 3);

INSERT Permissao(id, ativo, nome, permissoes, tipo)
	VALUES (1, true, "Aluno", "Agenda", 1);
    
INSERT Permissao(id, ativo, nome, permissoes, tipo)
	VALUES (2, true, "Professor", "Agenda", 2);
    
INSERT Permissao(id, ativo, nome, permissoes, tipo)
	VALUES (3, true, "Admin", "Total", 3);