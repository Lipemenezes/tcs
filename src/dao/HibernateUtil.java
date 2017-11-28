package dao;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.boot.registry.StandardServiceRegistryBuilder;
import org.hibernate.cfg.Configuration;

import entity.Avaliacao;
import entity.Curso;
import entity.Disciplina;
import entity.Permissao;
import entity.Turma;
import entity.Usuario;

/**
 * 
 * @author Felipe Menezes
 */
public class HibernateUtil {

	private static final SessionFactory sessionFactory;

	static {
		try {
			Configuration cfg = new Configuration();
			cfg.addAnnotatedClass(Avaliacao.class);
			cfg.addAnnotatedClass(Curso.class);
			cfg.addAnnotatedClass(Disciplina.class);
			cfg.addAnnotatedClass(Permissao.class);
			cfg.addAnnotatedClass(Turma.class);
			cfg.addAnnotatedClass(Usuario.class);

			cfg.configure("/dao/hibernate.cfg.xml");
			StandardServiceRegistryBuilder build = new StandardServiceRegistryBuilder()
					.applySettings(cfg.getProperties());
			sessionFactory = cfg.buildSessionFactory(build.build());

		} catch (Throwable ex) {
			// Log the exception.
			System.err.println("Erro ao criar fábrica coneção" + ex);
			throw new ExceptionInInitializerError(ex);
		}
	}

	public static Session openSession() {
		return sessionFactory.openSession();
	}
}