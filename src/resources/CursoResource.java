package resources;

import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;

@Path("/cursos")
public class CursoResource {
	
	@GET
	@Produces("application/json")
	public List<String> getCursos() {
		List<String> lista = new ArrayList<String>();
		lista.add("a");
		lista.add("b");
		lista.add("c");
		return lista;
	}

}
