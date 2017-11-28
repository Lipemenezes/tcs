package dao;

import java.util.List;
import org.hibernate.HibernateException;
import org.hibernate.Session;

/**
 * 
 * @author Felipe Menezes
 *
 */
public interface BaseDao<T, ID> {

	void saveOrUpdate(T entidade, Session session) throws HibernateException;

	void delete(T entidade, Session session) throws HibernateException;

	T searchById(ID id, Session session) throws HibernateException;

	List<T> listAll(Session session) throws HibernateException;

}