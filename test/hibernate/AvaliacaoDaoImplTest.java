package hibernate;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotNull;

import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.junit.Test;

import dao.AvaliacaoDao;
import dao.AvaliacaoDaoImpl;
import dao.HibernateUtil;
import entity.Avaliacao;
import entity.Usuario;
import util.Generator;

/**
 * 
 * @author Felipe Menezes
 *
 */
public class AvaliacaoDaoImplTest {
	private Avaliacao avaliacao;
	private AvaliacaoDao avaliacaoDao;
	private Session session;
	private List<Usuario> usuarios;

	public AvaliacaoDaoImplTest() {
		avaliacaoDao = new AvaliacaoDaoImpl();
	}

	@Test
	public void testSave() {

		UsuarioDaoImplTest usuarioTest = new UsuarioDaoImplTest();
		Usuario usuario = usuarioTest.createUsuarioIfNotExists();
		
		session = HibernateUtil.openSession();
		avaliacao = new Avaliacao();
		avaliacao.setNome(Generator.randomString() + "_save");
		avaliacao.setAtivo(true);
		avaliacaoDao.saveOrUpdate(avaliacao, session);
		session.close();

		assertNotNull(avaliacao.getId());
	}

	@Test
	public void testUpdate() {
		createAvaliacaoIfNotExists();
		session = HibernateUtil.openSession();
		avaliacao.setNome(Generator.randomString() + "_update");
		avaliacaoDao.saveOrUpdate(avaliacao, session);

		Avaliacao updatedAvaliacao = avaliacaoDao.searchById(avaliacao.getId(), session);

		assertEquals(avaliacao.getNome(), updatedAvaliacao.getNome());
	}

	@Test
	public void testListAll() {
		createAvaliacaoIfNotExists();
		session = HibernateUtil.openSession();
		AvaliacaoDaoImpl avaliacaoDaoImpl = new AvaliacaoDaoImpl();
		List<Avaliacao> list = avaliacaoDaoImpl.listAll(session);

		assertFalse(list.isEmpty());
	}

	private void createAvaliacaoIfNotExists() {
		session = HibernateUtil.openSession();
		Query consulta = session.createQuery("select max(id) from Avaliacao");
		Long id = (Long) consulta.uniqueResult();
		session.close();
		if (id == null) {
			testSave();
		} else {
			session = HibernateUtil.openSession();
			avaliacao = avaliacaoDao.searchById(id, session);
			session.close();
		}

	}
}