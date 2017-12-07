package filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import bo.PermissaoBo;
import entity.Usuario;

@WebFilter("/filtroUsuario")
public class FiltroLogin implements Filter {

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain filter)
			throws IOException, ServletException {

		Usuario usuario = null;
		HttpSession sessao = ((HttpServletRequest) request).getSession();

		if (sessao != null) {
			usuario = (Usuario) sessao.getAttribute("usuarioConectado");
		}

		PermissaoBo permissaoBO = new PermissaoBo();
		if (permissaoBO.validarDestinoDoUsuario(usuario) != null) {
			filter.doFilter(request, response);
		} else {
			String contextPath = ((HttpServletRequest) request).getContextPath();
			((HttpServletResponse) response).sendRedirect(contextPath + permissaoBO.validarDestinoDoUsuario(usuario));
		}
	}

	@Override
	public void init(FilterConfig arg0) throws ServletException {

	}

	@Override
	public void destroy() {

	}

}
