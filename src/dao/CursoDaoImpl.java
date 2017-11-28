package dao;

import java.util.List;

import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.Session;

import entity.Curso;

public class CursoDaoImpl extends BaseDaoImpl<Curso, Long> implements CursoDao {

    @Override
    public Curso searchById(Long id, Session session) throws HibernateException {
        Curso resultado = (Curso) 
                session.get(Curso.class, id);
        return resultado;
    }

    @Override
    public List<Curso> listAll(Session session) throws HibernateException {
        Query resultQuery = session.createQuery("from Curso");
        return resultQuery.list();
    }

}