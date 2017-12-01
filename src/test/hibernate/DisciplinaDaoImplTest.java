package hibernate;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotNull;

import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.junit.Test;

import dao.DisciplinaDao;
import dao.DisciplinaDaoImpl;
import dao.HibernateUtil;
import entity.Disciplina;
import util.Generator;

/**
 * 
 * @author Felipe Menezes
 *
 */
public class DisciplinaDaoImplTest {
    private Disciplina disciplina;
    private DisciplinaDao disciplinaDao;
    private Session session;

    public DisciplinaDaoImplTest() {
        disciplinaDao = new DisciplinaDaoImpl();
    }

    @Test
    public void testSave() {
        session = HibernateUtil.openSession();
        disciplina = new Disciplina();
        disciplina.setNome(Generator.randomString() + "_save");
        disciplinaDao.saveOrUpdate(disciplina, session);
        session.close();

        assertNotNull(disciplina.getId());
    }

    @Test
    public void testUpdate() {
        createDisciplinaIfNotExists();
        session = HibernateUtil.openSession();
        disciplina.setNome(Generator.randomString() + "_update");
        disciplinaDao.saveOrUpdate(disciplina, session);

        Disciplina updatedDisciplina = disciplinaDao.searchById(disciplina.getId(), session);

        assertEquals(disciplina.getNome(), updatedDisciplina.getNome());
    }

    @Test
    public void testListAll() {
        createDisciplinaIfNotExists();
        session = HibernateUtil.openSession();
        DisciplinaDaoImpl disciplinaDaoImpl = new DisciplinaDaoImpl();
        List<Disciplina> list = disciplinaDaoImpl.listAll(session);

        assertFalse(list.isEmpty());
    }

    private void createDisciplinaIfNotExists() {
        session = HibernateUtil.openSession();
        Query consulta = session.createQuery("select max(id) from Disciplina");
        Long id = (Long) consulta.uniqueResult();
        session.close();
        if (id == null) {
            testSave();
        } else {
            session = HibernateUtil.openSession();
            disciplina = disciplinaDao.searchById(id, session);
            session.close();
        }

    }
}