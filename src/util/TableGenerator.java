package util;

import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

/**
 * 
 * @author Felipe Menezes
 *
 */
public class TableGenerator {

	public static void main(String[] args) {

		EntityManagerFactory managerFactory = Persistence.createEntityManagerFactory("projeto_tcs_PU");
		managerFactory.close();

	}

}
