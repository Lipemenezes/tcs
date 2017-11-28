package dao;

import java.util.List;

import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.Session;

import entity.Permissao;

/**
 * 
 * @author Felipe Menezes
 *
 */
public class PermissaoDaoImpl extends BaseDaoImpl<Permissao, Long> implements PermissaoDao {

	@Override
	public Permissao searchById(Long id, Session session) throws HibernateException {
		Permissao resultado = (Permissao) session.get(Permissao.class, id);
		return resultado;
	}

	@Override
	public List<Permissao> listAll(Session session) throws HibernateException {
		Query resultQuery = session.createQuery("from Permissao");
		return resultQuery.list();
	}

}