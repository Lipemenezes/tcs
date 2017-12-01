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
import dao.PermissaoDaoImpl;
import entity.Permissao;

@Path("/permissoes")
public class PermissaoResource {

	private PermissaoDaoImpl permissaoDaoImpl;
	private Session session;
	
	@GET
	@Produces({ MediaType.APPLICATION_JSON })
	public GenericEntity<List<Permissao>> listaTodos(){
		session = HibernateUtil.openSession();
        permissaoDaoImpl = new PermissaoDaoImpl();
        List<Permissao> list = permissaoDaoImpl.listAll(session);
		session.close();
		return new GenericEntity<List<Permissao>>(list) {};
	}
	
	@GET
	@Path("/permissao")
	@Produces({ MediaType.APPLICATION_JSON })
	public GenericEntity<Permissao> pegaPorId(@QueryParam("id") Long id){
		session = HibernateUtil.openSession();
        permissaoDaoImpl = new PermissaoDaoImpl();
        Permissao permissao = permissaoDaoImpl.searchById(new Long(id), session);
		session.close();
		return new GenericEntity<Permissao>(permissao) {};
	}
	
	@POST
	@Produces({ MediaType.APPLICATION_JSON })
	@Consumes(MediaType.APPLICATION_JSON)
	public GenericEntity<Permissao> cria(Permissao permissao){
		session = HibernateUtil.openSession();
        permissaoDaoImpl = new PermissaoDaoImpl();
        permissaoDaoImpl.saveOrUpdate(permissao, session);
		session.close();
		return new GenericEntity<Permissao>(permissao) {};
	}
	
	@DELETE
	@Produces({ MediaType.APPLICATION_JSON })
	@Consumes(MediaType.APPLICATION_JSON)
	public boolean deleta(Permissao permissao){
		session = HibernateUtil.openSession();
        permissaoDaoImpl = new PermissaoDaoImpl();
        
        permissaoDaoImpl.delete(permissao, session);
        permissao = permissaoDaoImpl.searchById(permissao.getId(), session);
		session.close();
		
		if (permissao != null)
			return false;
		
		return true;
	}
	
	@PUT
	@Produces({ MediaType.APPLICATION_JSON })
	@Consumes(MediaType.APPLICATION_JSON)
	public GenericEntity<Permissao> atualiza(Permissao permissao){
		session = HibernateUtil.openSession();
        permissaoDaoImpl = new PermissaoDaoImpl();
        permissaoDaoImpl.saveOrUpdate(permissao, session);
		session.close();
		return new GenericEntity<Permissao>(permissao) {};
	}

}
