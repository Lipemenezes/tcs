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

import dao.CursoDaoImpl;
import dao.HibernateUtil;
import entity.Curso;

@Path("/cursos")
public class CursoResource {

	private CursoDaoImpl cursoDaoImpl;
	private Session session;
	
	@GET
	@Produces({ MediaType.APPLICATION_JSON })
	public GenericEntity<List<Curso>> listaTodos(){
		session = HibernateUtil.openSession();
        cursoDaoImpl = new CursoDaoImpl();
        List<Curso> list = cursoDaoImpl.listAll(session);
		session.close();
		return new GenericEntity<List<Curso>>(list) {};
	}
	
	@GET
	@Path("/curso")
	@Produces({ MediaType.APPLICATION_JSON })
	public GenericEntity<Curso> pegaPorId(@QueryParam("id") Long id){
		session = HibernateUtil.openSession();
        cursoDaoImpl = new CursoDaoImpl();
        Curso curso = cursoDaoImpl.searchById(new Long(id), session);
		session.close();
		return new GenericEntity<Curso>(curso) {};
	}
	
	@POST
	@Produces({ MediaType.APPLICATION_JSON })
	@Consumes(MediaType.APPLICATION_JSON)
	public GenericEntity<Curso> cria(Curso curso){
		session = HibernateUtil.openSession();
        cursoDaoImpl = new CursoDaoImpl();
        cursoDaoImpl.saveOrUpdate(curso, session);
		session.close();
		return new GenericEntity<Curso>(curso) {};
	}
	
	@DELETE
	@Produces({ MediaType.APPLICATION_JSON })
	@Consumes(MediaType.APPLICATION_JSON)
	public boolean deleta(Curso curso){
		session = HibernateUtil.openSession();
        cursoDaoImpl = new CursoDaoImpl();
        
        cursoDaoImpl.delete(curso, session);
        curso = cursoDaoImpl.searchById(curso.getId(), session);
		session.close();
		
		if (curso != null)
			return false;
		
		return true;
	}
	
	@PUT
	@Produces({ MediaType.APPLICATION_JSON })
	@Consumes(MediaType.APPLICATION_JSON)
	public GenericEntity<Curso> atualiza(Curso curso){
		session = HibernateUtil.openSession();
        cursoDaoImpl = new CursoDaoImpl();
        cursoDaoImpl.saveOrUpdate(curso, session);
		session.close();
		return new GenericEntity<Curso>(curso) {};
	}

}
