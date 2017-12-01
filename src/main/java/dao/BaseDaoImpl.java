package dao;

import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.Transaction;

/**
 * 
 * @author Felipe Menezes
 *
 */
public abstract class BaseDaoImpl<T, ID> implements BaseDao<T, ID> {

	private Transaction transaction;

	@Override
	public void saveOrUpdate(T entity, Session session) throws HibernateException {
		transaction = session.beginTransaction();
		session.saveOrUpdate(entity);
		transaction.commit();
	}

	@Override
	public void delete(T entity, Session session) throws HibernateException {
		transaction = session.beginTransaction();
		session.delete(entity);
		transaction.commit();
	}

}