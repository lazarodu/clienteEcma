import api from "../services/api";

class Adiciona {
  constructor() {}

  async store() {
    try {
      const response = await api.post("/alunos", {
        nome: this.nome,
        curso_id: this.curso_id,
        descricao: this.descricao,
      });
      window.location.href = "/";
    } catch (error) {
      alert(`Falha ao cadastrar: ${error}`);
    }
  }

  async form(event) {
    event.preventDefault();
    this.nome = document.querySelector("input[name=nome]").value;
    this.curso_id = document.querySelector("select[name=curso_id]").value;
    this.descricao = document.querySelector("textarea[name=descricao]").value;
    if (this.nome && this.curso_id && this.descricao) {
      await this.store();
    }
  }
}

export default Adiciona;
