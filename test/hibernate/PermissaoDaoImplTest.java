package hibernate;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotNull;

import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.junit.Test;

import dao.HibernateUtil;
import dao.PermissaoDao;
import dao.PermissaoDaoImpl;
import entity.Permissao;
import util.Generator;

/**
 * 
 * @author Felipe Menezes
 *
 */
public class PermissaoDaoImplTest {
	private Permissao permissao;
	private PermissaoDao permissaoDao;
	private Session session;

	public PermissaoDaoImplTest() {
		permissaoDao = new PermissaoDaoImpl();
	}

	@Test
	public void testSave() {
		session = HibernateUtil.openSession();
		permissao = new Permissao();
		permissao.setNome(Generator.randomString() + "_save");
		permissaoDao.saveOrUpdate(permissao, session);
		session.close();

		assertNotNull(permissao.getId());
	}

	@Test
	public void testUpdate() {
		createPermissaoIfNotExists();
		session = HibernateUtil.openSession();
		permissao.setNome(Generator.randomString() + "_update");
		permissaoDao.saveOrUpdate(permissao, session);

		Permissao updatedPermissao = permissaoDao.searchById(permissao.getId(), session);

		assertEquals(permissao.getNome(), updatedPermissao.getNome());
	}

	@Test
	public void testListAll() {
		createPermissaoIfNotExists();
		session = HibernateUtil.openSession();
		PermissaoDaoImpl permissaoDaoImpl = new PermissaoDaoImpl();
		List<Permissao> list = permissaoDaoImpl.listAll(session);

		assertFalse(list.isEmpty());
	}

	private void createPermissaoIfNotExists() {
		session = HibernateUtil.openSession();
		Query consulta = session.createQuery("select max(id) from Permissao");
		Long id = (Long) consulta.uniqueResult();
		session.close();
		if (id == null) {
			testSave();
		} else {
			session = HibernateUtil.openSession();
			permissao = permissaoDao.searchById(id, session);
			session.close();
		}

	}
}