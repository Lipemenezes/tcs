package resources;

import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.GenericEntity;
import javax.ws.rs.core.MediaType;

import org.hibernate.Session;

import dao.HibernateUtil;
import dao.UsuarioDaoImpl;
import entity.Usuario;

@Path("/usuarios")
public class UsuarioResource {

	private UsuarioDaoImpl usuarioDaoImpl;
	private Session session;
	
	@GET
	@Produces({ MediaType.APPLICATION_JSON })
	public GenericEntity<List<Usuario>> listaTodos(){
		session = HibernateUtil.openSession();
        usuarioDaoImpl = new UsuarioDaoImpl();
        List<Usuario> list = usuarioDaoImpl.listAll(session);
		session.close();
		return new GenericEntity<List<Usuario>>(list) {};
	}
	
	@GET
	@Path("/professores")
	@Produces({ MediaType.APPLICATION_JSON })
	public GenericEntity<List<Usuario>> listaTodosProfessores(){
		session = HibernateUtil.openSession();
        usuarioDaoImpl = new UsuarioDaoImpl();
        List<Usuario> list = usuarioDaoImpl.listProfessor(session);
		session.close();
		return new GenericEntity<List<Usuario>>(list) {};
	}
	
	@GET
	@Path("/alunos")
	@Produces({ MediaType.APPLICATION_JSON })
	public GenericEntity<List<Usuario>> listaTodosAlunos(){
		session = HibernateUtil.openSession();
        usuarioDaoImpl = new UsuarioDaoImpl();
        List<Usuario> list = usuarioDaoImpl.listAluno(session);
		session.close();
		return new GenericEntity<List<Usuario>>(list) {};
	}
	
	@GET
	@Path("/usuario")
	@Produces({ MediaType.APPLICATION_JSON })
	public GenericEntity<Usuario> pegaPorId(@QueryParam("id") Long id){
		session = HibernateUtil.openSession();
        usuarioDaoImpl = new UsuarioDaoImpl();
        Usuario usuario = usuarioDaoImpl.searchById(new Long(id), session);
		session.close();
		return new GenericEntity<Usuario>(usuario) {};
	}
	
	@POST
	@Produces({ MediaType.APPLICATION_JSON })
	@Consumes(MediaType.APPLICATION_JSON)
	public GenericEntity<Usuario> cria(Usuario usuario){
		session = HibernateUtil.openSession();
        usuarioDaoImpl = new UsuarioDaoImpl();
        usuarioDaoImpl.saveOrUpdate(usuario, session);
		session.close();
		return new GenericEntity<Usuario>(usuario) {};
	}
	
	@DELETE
	@Produces({ MediaType.APPLICATION_JSON })
	@Consumes(MediaType.APPLICATION_JSON)
	public boolean deleta(Usuario usuario){
		session = HibernateUtil.openSession();
        usuarioDaoImpl = new UsuarioDaoImpl();
        
        usuarioDaoImpl.remove(usuario, session);
        usuario = usuarioDaoImpl.searchById(usuario.getId(), session);
		session.close();
		
		if (usuario != null)
			return false;
		
		return true;
	}
	
	@PUT
	@Produces({ MediaType.APPLICATION_JSON })
	@Consumes(MediaType.APPLICATION_JSON)
	public GenericEntity<Usuario> atualiza(Usuario usuario){
		session = HibernateUtil.openSession();
        usuarioDaoImpl = new UsuarioDaoImpl();
        usuarioDaoImpl.saveOrUpdate(usuario, session);
		session.close();
		return new GenericEntity<Usuario>(usuario) {};
	}

}
