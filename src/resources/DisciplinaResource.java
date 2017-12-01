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

import dao.DisciplinaDaoImpl;
import dao.HibernateUtil;
import entity.Disciplina;

@Path("/disciplinas")
public class DisciplinaResource {

	private DisciplinaDaoImpl disciplinaDaoImpl;
	private Session session;
	
	@GET
	@Produces({ MediaType.APPLICATION_JSON })
	public GenericEntity<List<Disciplina>> listaTodos(){
		session = HibernateUtil.openSession();
        disciplinaDaoImpl = new DisciplinaDaoImpl();
        List<Disciplina> list = disciplinaDaoImpl.listAll(session);
		session.close();
		return new GenericEntity<List<Disciplina>>(list) {};
	}
	
	@GET
	@Path("/disciplina")
	@Produces({ MediaType.APPLICATION_JSON })
	public GenericEntity<Disciplina> pegaPorId(@QueryParam("id") Long id){
		session = HibernateUtil.openSession();
        disciplinaDaoImpl = new DisciplinaDaoImpl();
        Disciplina disciplina = disciplinaDaoImpl.searchById(new Long(id), session);
		session.close();
		return new GenericEntity<Disciplina>(disciplina) {};
	}
	
	@POST
	@Produces({ MediaType.APPLICATION_JSON })
	@Consumes(MediaType.APPLICATION_JSON)
	public GenericEntity<Disciplina> cria(Disciplina disciplina){
		session = HibernateUtil.openSession();
        disciplinaDaoImpl = new DisciplinaDaoImpl();
        disciplinaDaoImpl.saveOrUpdate(disciplina, session);
		session.close();
		return new GenericEntity<Disciplina>(disciplina) {};
	}
	
	@DELETE
	@Produces({ MediaType.APPLICATION_JSON })
	@Consumes(MediaType.APPLICATION_JSON)
	public boolean deleta(Disciplina disciplina){
		session = HibernateUtil.openSession();
        disciplinaDaoImpl = new DisciplinaDaoImpl();
        
        disciplinaDaoImpl.delete(disciplina, session);
        disciplina = disciplinaDaoImpl.searchById(disciplina.getId(), session);
		session.close();
		
		if (disciplina != null)
			return false;
		
		return true;
	}
	
	@PUT
	@Produces({ MediaType.APPLICATION_JSON })
	@Consumes(MediaType.APPLICATION_JSON)
	public GenericEntity<Disciplina> atualiza(Disciplina disciplina){
		session = HibernateUtil.openSession();
        disciplinaDaoImpl = new DisciplinaDaoImpl();
        disciplinaDaoImpl.saveOrUpdate(disciplina, session);
		session.close();
		return new GenericEntity<Disciplina>(disciplina) {};
	}

}
