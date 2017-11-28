package dao;

import java.util.List;

import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.Session;

import entity.Turma;

/**
 * 
 * @author Felipe Menezes
 *
 */
public class TurmaDaoImpl extends BaseDaoImpl<Turma, Long> implements TurmaDao {

	@Override
	public Turma searchById(Long id, Session session) throws HibernateException {
		Turma resultado = (Turma) session.get(Turma.class, id);
		return resultado;
	}

	@Override
	public List<Turma> listAll(Session session) throws HibernateException {
		Query resultQuery = session.createQuery("from Turma");
		return resultQuery.list();
	}

}