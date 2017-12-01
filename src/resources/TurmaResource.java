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
import dao.TurmaDaoImpl;
import entity.Turma;

@Path("/turmas")
public class TurmaResource {

	private TurmaDaoImpl turmaDaoImpl;
	private Session session;
	
	@GET
	@Produces({ MediaType.APPLICATION_JSON })
	public GenericEntity<List<Turma>> listaTodos(){
		session = HibernateUtil.openSession();
        turmaDaoImpl = new TurmaDaoImpl();
        List<Turma> list = turmaDaoImpl.listAll(session);
		session.close();
		return new GenericEntity<List<Turma>>(list) {};
	}
	
	@GET
	@Path("/turma")
	@Produces({ MediaType.APPLICATION_JSON })
	public GenericEntity<Turma> pegaPorId(@QueryParam("id") Long id){
		session = HibernateUtil.openSession();
        turmaDaoImpl = new TurmaDaoImpl();
        Turma turma = turmaDaoImpl.searchById(new Long(id), session);
		session.close();
		return new GenericEntity<Turma>(turma) {};
	}
	
	@POST
	@Produces({ MediaType.APPLICATION_JSON })
	@Consumes(MediaType.APPLICATION_JSON)
	public GenericEntity<Turma> cria(Turma turma){
		session = HibernateUtil.openSession();
        turmaDaoImpl = new TurmaDaoImpl();
        turmaDaoImpl.saveOrUpdate(turma, session);
		session.close();
		return new GenericEntity<Turma>(turma) {};
	}
	
	@DELETE
	@Produces({ MediaType.APPLICATION_JSON })
	@Consumes(MediaType.APPLICATION_JSON)
	public boolean deleta(Turma turma){
		session = HibernateUtil.openSession();
        turmaDaoImpl = new TurmaDaoImpl();
        
        turmaDaoImpl.delete(turma, session);
        turma = turmaDaoImpl.searchById(turma.getId(), session);
		session.close();
		
		if (turma != null)
			return false;
		
		return true;
	}
	
	@PUT
	@Produces({ MediaType.APPLICATION_JSON })
	@Consumes(MediaType.APPLICATION_JSON)
	public GenericEntity<Turma> atualiza(Turma turma){
		session = HibernateUtil.openSession();
        turmaDaoImpl = new TurmaDaoImpl();
        turmaDaoImpl.saveOrUpdate(turma, session);
		session.close();
		return new GenericEntity<Turma>(turma) {};
	}

}
