package hibernate;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotNull;

import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.junit.Test;

import dao.HibernateUtil;
import dao.CursoDao;
import dao.CursoDaoImpl;
import entity.Curso;
import util.Generator;

/**
 * 
 * @author Felipe Menezes
 *
 */
public class CursoDaoImplTest {
    private Curso curso;
    private CursoDao cursoDao;
    private Session session;

    public CursoDaoImplTest() {
        cursoDao = new CursoDaoImpl();
    }

    @Test
    public void testSave() {
        session = HibernateUtil.openSession();
        curso = new Curso();
        curso.setNome(Generator.randomString() + "_save");
        cursoDao.saveOrUpdate(curso, session);
        session.close();

        assertNotNull(curso.getId());
    }

    @Test
    public void testUpdate() {
        createCursoIfNotExists();
        session = HibernateUtil.openSession();
        curso.setNome(Generator.randomString() + "_update");
        cursoDao.saveOrUpdate(curso, session);

        Curso updatedCurso = cursoDao.searchById(curso.getId(), session);

        assertEquals(curso.getNome(), updatedCurso.getNome());
    }

    @Test
    public void testListAll() {
        createCursoIfNotExists();
        session = HibernateUtil.openSession();
        CursoDaoImpl cursoDaoImpl = new CursoDaoImpl();
        List<Curso> list = cursoDaoImpl.listAll(session);

        assertFalse(list.isEmpty());
    }

    private void createCursoIfNotExists() {
        session = HibernateUtil.openSession();
        Query consulta = session.createQuery("select max(id) from Curso");
        Long id = (Long) consulta.uniqueResult();
        session.close();
        if (id == null) {
            testSave();
        } else {
            session = HibernateUtil.openSession();
            curso = cursoDao.searchById(id, session);
            session.close();
        }

    }
}