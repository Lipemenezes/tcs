///*
//    Replace Class for your class name (e.g: User)
//    Replace class for your class instance name (e.g: user)
//
//    Felipe Menezes
//*/
//
//package hibernate;
//
//import static org.junit.Assert.assertEquals;
//import static org.junit.Assert.assertFalse;
//import static org.junit.Assert.assertNotNull;
//
//import java.util.List;
//
//import org.hibernate.Query;
//import org.hibernate.Session;
//import org.junit.Test;
//
//import dao.HibernateUtil;
//import dao.ClassDao;
//import dao.ClassDaoImpl;
//import entity.Class;
//import util.Generator;
//
///**
// * 
// * @author Felipe Menezes
// *
// */
//public class ClassDaoImplTest {
//    private Class class;
//    private ClassDao classDao;
//    private Session session;
//
//    public ClassDaoImplTest() {
//        classDao = new ClassDaoImpl();
//    }
//
//    @Test
//    public void testSave() {
//        session = HibernateUtil.openSession();
//        class = new Class();
//        class.setNome(Generator.randomString() + "_save");
//        classDao.saveOrUpdate(class, session);
//        session.close();
//
//        assertNotNull(class.getId());
//    }
//
//    @Test
//    public void testUpdate() {
//        createClassIfNotExists();
//        session = HibernateUtil.openSession();
//        class.setNome(Generator.randomString() + "_update");
//        classDao.saveOrUpdate(class, session);
//
//        Class updatedClass = classDao.searchById(class.getId(), session);
//
//        assertEquals(class.getNome(), updatedClass.getNome());
//    }
//
//    @Test
//    public void testListAll() {
//        createClassIfNotExists();
//        session = HibernateUtil.openSession();
//        ClassDaoImpl classDaoImpl = new ClassDaoImpl();
//        List<Class> list = classDaoImpl.listAll(session);
//
//        assertFalse(list.isEmpty());
//    }
//
//    private void createClassIfNotExists() {
//        session = HibernateUtil.openSession();
//        Query consulta = session.createQuery("select max(id) from Class");
//        Long id = (Long) consulta.uniqueResult();
//        session.close();
//        if (id == null) {
//            testSave();
//        } else {
//            session = HibernateUtil.openSession();
//            class = classDao.searchById(id, session);
//            session.close();
//        }
//
//    }
//}