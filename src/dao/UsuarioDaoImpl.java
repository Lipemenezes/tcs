package dao;

import java.util.List;

import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.Session;

import entity.Usuario;

/**
 * 
 * @author Felipe Menezes
 *
 */
public class UsuarioDaoImpl extends BaseDaoImpl<Usuario, Long> implements UsuarioDao {

	@Override
	public Usuario searchById(Long id, Session session) throws HibernateException {
		Usuario resultado = (Usuario) session.get(Usuario.class, id);
		return resultado;
	}

	@Override
	public List<Usuario> listAll(Session session) throws HibernateException {
		Query resultQuery = session.createQuery("from Usuario");
		return resultQuery.list();
	}

}