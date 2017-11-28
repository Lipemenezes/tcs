package hibernate;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotNull;

import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.junit.Test;

import dao.HibernateUtil;
import dao.TurmaDao;
import dao.TurmaDaoImpl;
import entity.Turma;
import util.Generator;

/**
 * 
 * @author Felipe Menezes
 *
 */
public class TurmaDaoImplTest {
    private Turma turma;
    private TurmaDao turmaDao;
    private Session session;

    public TurmaDaoImplTest() {
        turmaDao = new TurmaDaoImpl();
    }

    @Test
    public void testSave() {
        session = HibernateUtil.openSession();
        turma = new Turma();
        turma.setNome(Generator.randomString() + "_save");
        turmaDao.saveOrUpdate(turma, session);
        session.close();

        assertNotNull(turma.getId());
    }

    @Test
    public void testUpdate() {
        createTurmaIfNotExists();
        session = HibernateUtil.openSession();
        turma.setNome(Generator.randomString() + "_update");
        turmaDao.saveOrUpdate(turma, session);

        Turma updatedTurma = turmaDao.searchById(turma.getId(), session);

        assertEquals(turma.getNome(), updatedTurma.getNome());
    }

    @Test
    public void testListAll() {
        createTurmaIfNotExists();
        session = HibernateUtil.openSession();
        TurmaDaoImpl turmaDaoImpl = new TurmaDaoImpl();
        List<Turma> list = turmaDaoImpl.listAll(session);

        assertFalse(list.isEmpty());
    }

    private void createTurmaIfNotExists() {
        session = HibernateUtil.openSession();
        Query consulta = session.createQuery("select max(id) from Turma");
        Long id = (Long) consulta.uniqueResult();
        session.close();
        if (id == null) {
            testSave();
        } else {
            session = HibernateUtil.openSession();
            turma = turmaDao.searchById(id, session);
            session.close();
        }

    }
}