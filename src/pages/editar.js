import api from "../services/api";

class Edita {
  constructor() {
    this.id = localStorage.getItem("id");
  }

  async show() {
    try {
      const response = await api.get(`/alunos/${this.id}`);
      const { nome, curso_id, descricao } = response.data;
      document.querySelector("input[name=nome]").value = nome;
      document.querySelector("select[name=curso_id]").value = curso_id;
      document.querySelector("textarea[name=descricao]").value = descricao;
    } catch (error) {
      alert(`Erro ao buscar: ${error}`);
    }
  }

  async update() {
    try {
      const response = await api.put(`/alunos/${this.id}`, {
        nome: this.nome,
        curso_id: this.curso_id,
        descricao: this.descricao,
      });
      localStorage.removeItem("id");
      window.location.href = "/";
    } catch (error) {
      alert(`Falha ao atualizar: ${error}`);
    }
  }

  async form(event) {
    event.preventDefault();
    this.nome = document.querySelector("input[name=nome]").value;
    this.curso_id = document.querySelector("select[name=curso_id]").value;
    this.descricao = document.querySelector("textarea[name=descricao]").value;
    if (this.nome && this.curso_id && this.descricao) {
      await this.update();
    }
  }
}

export default Edita;
