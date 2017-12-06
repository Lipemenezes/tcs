package bo;

import entity.Usuario;

public class PermissaoBo {

	private String urlRedirectIndex = "login.html";
	private String urlRedirectAdmin = "/adm/";
	private String urlRedirectAluno = "/adm/list_agenda.html";
	private String urlRedirectProfessor = "/adm/list_agenda.html";

	public String validarDestinoDoUsuario(Usuario usuario) {


		if (usuario != null && usuario.getPermissao().getTipo() == 1) {
			return urlRedirectAluno;
		}
		if (usuario != null && usuario.getPermissao().getTipo() == 2) {
			return urlRedirectProfessor;
		}
		if (usuario != null && usuario.getPermissao().getTipo() == 3) {
			return urlRedirectAdmin;

		}

		return urlRedirectIndex;
	}

}
