package entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

/**
 * 
 * @author Felipe Menezes
 *
 */
@Entity
@Table(name = "turma")
@JsonIdentityInfo(generator=ObjectIdGenerators.PropertyGenerator.class, property="id")
public class Turma {

	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	@Column(length = 100, nullable = true)
	private String semestre;

	@Column(length = 100, nullable = true)
	private String turno;

	@Column
	private boolean ativo;

	@ManyToOne
	@JoinColumn(name = "disciplina_id")
	private Disciplina disciplina;

	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(name = "usuario_turma", joinColumns = { @JoinColumn(name = "turma_id") }, inverseJoinColumns = {
			@JoinColumn(name = "usuario_id") })
//	@JsonIgnore
	@JsonBackReference
	private List<Usuario> usuarios = new ArrayList<Usuario>();

	public Turma() {
		super();
	}

	public Turma(Long id, String semestre, String turno, boolean ativo, Disciplina disciplina, 
			List<Usuario> usuarios) {
		super();
		this.id = id;
		this.semestre = semestre;
		this.turno = turno;
		this.ativo = ativo;
		this.disciplina = disciplina;
		this.usuarios = usuarios;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getSemestre() {
		return semestre;
	}

	public void setSemestre(String semestre) {
		this.semestre = semestre;
	}

	public String getTurno() {
		return turno;
	}

	public void setTurno(String turno) {
		this.turno = turno;
	}

	public boolean isAtivo() {
		return ativo;
	}

	public void setAtivo(boolean ativo) {
		this.ativo = ativo;
	}

	public Disciplina getDisciplina() {
		return disciplina;
	}

	public void setDisciplina(Disciplina disciplina) {
		this.disciplina = disciplina;
	}

	public List<Usuario> getUsuarios() {
		return usuarios;
	}

	public void setUsuarios(List<Usuario> usuarios) {
		this.usuarios = usuarios;
	}

}
