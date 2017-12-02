package dao;

import java.util.List;
import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.Session;
import entity.Avaliacao;

/**
 * 
 * @author Felipe Menezes
 *
 */
public class AvaliacaoDaoImpl extends BaseDaoImpl<Avaliacao, Long> implements AvaliacaoDao {

	@Override
	public Avaliacao searchById(Long id, Session session) throws HibernateException {
		Avaliacao avaliacao = (Avaliacao) session.get(Avaliacao.class, id);
		return avaliacao;
	}

	@Override
	public List<Avaliacao> listAll(Session session) throws HibernateException {
		Query avaliacao = session.createQuery("from Avaliacao");
		return avaliacao.list();
	}

}
