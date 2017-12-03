package hibernate;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotNull;

import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.junit.Test;

import dao.HibernateUtil;
import dao.UsuarioDao;
import dao.UsuarioDaoImpl;
import entity.Usuario;
import util.Generator;

/**
 * 
 * @author Felipe Menezes
 *
 */
public class UsuarioDaoImplTest {
	private Usuario usuario;
	private UsuarioDao usuarioDao;
	private Session session;

	public UsuarioDaoImplTest() {
		usuarioDao = new UsuarioDaoImpl();
	}

	@Test
	public void testSave() {
		session = HibernateUtil.openSession();
		usuario = new Usuario();
		usuario.setNome(Generator.randomString() + "_save");
		usuarioDao.saveOrUpdate(usuario, session);
		session.close();

		assertNotNull(usuario.getId());
	}

	@Test
	public void testUpdate() {
		createUsuarioIfNotExists();
		session = HibernateUtil.openSession();
		usuario.setNome(Generator.randomString() + "_update");
		usuarioDao.saveOrUpdate(usuario, session);

		Usuario updatedUsuario = usuarioDao.searchById(usuario.getId(), session);

		assertEquals(usuario.getNome(), updatedUsuario.getNome());
	}

	@Test
	public void testListAll() {
		createUsuarioIfNotExists();
		session = HibernateUtil.openSession();
		UsuarioDaoImpl usuarioDaoImpl = new UsuarioDaoImpl();
		List<Usuario> list = usuarioDaoImpl.listAll(session);

		assertFalse(list.isEmpty());
	}

	public Usuario createUsuarioIfNotExists() {
		session = HibernateUtil.openSession();
		Query consulta = session.createQuery("select max(id) from Usuario");
		Long id = (Long) consulta.uniqueResult();
		session.close();
		if (id == null) {
			testSave();
		} else {
			session = HibernateUtil.openSession();
			usuario = usuarioDao.searchById(id, session);
			session.close();
		}
		
		return usuario;

	}
}