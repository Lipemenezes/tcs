package resources;

import java.util.Date;
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

import dao.AvaliacaoDaoImpl;
import dao.HibernateUtil;
import entity.Avaliacao;

@Path("/avaliacoes")
public class AvaliacaoResource {

	private AvaliacaoDaoImpl avaliacaoDaoImpl;
	private Session session;

	@GET
	@Produces({ MediaType.APPLICATION_JSON })
	public GenericEntity<List<Avaliacao>> listaTodos(@QueryParam("disciplina") Long idDisciplina, 
			@QueryParam("startdate") Date startDate, @QueryParam("enddate") Date endDate) {
		
		session = HibernateUtil.openSession();
		avaliacaoDaoImpl = new AvaliacaoDaoImpl();
		List<Avaliacao> list;
//		if (startDate != null && endDate != null && idDisciplina != null) {
//			list = avaliacaoDaoImpl.listAll(session);
//		} else if (startDate != null && endDate != null) {
//			list = avaliacaoDaoImpl.listAll(session);
//		} else 
		if (idDisciplina != null) {
			list = avaliacaoDaoImpl.listByDisciplina(session, idDisciplina);		
		} else {
			list = avaliacaoDaoImpl.listAll(session);
		}
		
		session.close();
		return new GenericEntity<List<Avaliacao>>(list) {
		};
		
	}

	@GET
	@Path("/avaliacao")
	@Produces({ MediaType.APPLICATION_JSON })
	public GenericEntity<Avaliacao> pegaPorId(@QueryParam("id") Long id) {
		session = HibernateUtil.openSession();
		avaliacaoDaoImpl = new AvaliacaoDaoImpl();
		Avaliacao avaliacao = avaliacaoDaoImpl.searchById(new Long(id), session);
		session.close();
		return new GenericEntity<Avaliacao>(avaliacao) {
		};
	}

	@POST
	@Produces({ MediaType.APPLICATION_JSON })
	@Consumes(MediaType.APPLICATION_JSON)
	public GenericEntity<Avaliacao> cria(Avaliacao avaliacao) {
		session = HibernateUtil.openSession();
		avaliacaoDaoImpl = new AvaliacaoDaoImpl();
		avaliacaoDaoImpl.saveOrUpdate(avaliacao, session);
		session.close();
		return new GenericEntity<Avaliacao>(avaliacao) {
		};
	}

	@DELETE
	@Produces({ MediaType.APPLICATION_JSON })
	@Consumes(MediaType.APPLICATION_JSON)
	public boolean deleta(Avaliacao avaliacao) {
		session = HibernateUtil.openSession();
		avaliacaoDaoImpl = new AvaliacaoDaoImpl();

		avaliacaoDaoImpl.delete(avaliacao, session);
		avaliacao = avaliacaoDaoImpl.searchById(avaliacao.getId(), session);
		session.close();

		if (avaliacao != null)
			return false;

		return true;
	}

	@PUT
	@Produces({ MediaType.APPLICATION_JSON })
	@Consumes(MediaType.APPLICATION_JSON)
	public GenericEntity<Avaliacao> atualiza(Avaliacao avaliacao) {
		session = HibernateUtil.openSession();
		avaliacaoDaoImpl = new AvaliacaoDaoImpl();
		avaliacaoDaoImpl.saveOrUpdate(avaliacao, session);
		session.close();
		return new GenericEntity<Avaliacao>(avaliacao) {
		};
	}

}
