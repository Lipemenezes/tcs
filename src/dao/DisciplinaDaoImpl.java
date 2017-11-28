package dao;

import java.util.List;

import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.Session;

import entity.Disciplina;

/**
 * 
 * @author Felipe Menezes
 *
 */
public class DisciplinaDaoImpl extends BaseDaoImpl<Disciplina, Long> implements DisciplinaDao {

	@Override
	public Disciplina searchById(Long id, Session session) throws HibernateException {
		Disciplina resultado = (Disciplina) session.get(Disciplina.class, id);
		return resultado;
	}

	@Override
	public List<Disciplina> listAll(Session session) throws HibernateException {
		Query resultQuery = session.createQuery("from Disciplina");
		return resultQuery.list();
	}

}