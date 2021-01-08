import api from "../services/api";
import Remover from "./remover";

class Lista {
  constructor() {
    this.tBody = document.querySelector("tbody");
    localStorage.removeItem("id");
  }

  async index() {
    try {
      const response = await api.get("/alunos");
      this.dados = response.data;
      const add = document.querySelector("button[id=add]");
      add.addEventListener(
        "click",
        () => (window.location.href = "/form.html")
      );
      this.tabela();
    } catch (error) {
      alert(`Falha ao buscar os dados: ${error}`);
    }
  }

  editar(id) {
    localStorage.setItem("id", id);
    window.location.href = "/form.html";
  }

  remover(id) {
    if (confirm("Tem certeza?")) {
      const remove = new Remover(id);
      remove.remove();
    }
  }

  tabela() {
    this.tBody.innerHTML = "";
    this.dados.forEach((obj) => {
      const tr = document.createElement("tr");
      // coluna nome
      const tdNome = document.createElement("td");
      const nome = document.createTextNode(obj.nome);
      tdNome.appendChild(nome);
      tr.appendChild(tdNome);
      // coluna curso
      const tdCurso = document.createElement("td");
      const curso = document.createTextNode(obj.curso.nome);
      tdCurso.appendChild(curso);
      tr.appendChild(tdCurso);
      // coluna descrição
      const tdDesc = document.createElement("td");
      const desc = document.createTextNode(obj.descricao);
      tdDesc.appendChild(desc);
      tr.appendChild(tdDesc);
      // Editar
      const tdEditar = document.createElement("td");
      const btnEditar = document.createElement("button");
      btnEditar.setAttribute("class", "btn btn-info");
      btnEditar.setAttribute("type", "button");
      const iconEditar = document.createElement("i");
      iconEditar.setAttribute("class", "fa fa-pencil");
      btnEditar.appendChild(iconEditar);
      btnEditar.addEventListener("click", () => this.editar(obj.id));
      tdEditar.appendChild(btnEditar);
      tr.appendChild(tdEditar);
      // Remover
      const tdRemover = document.createElement("td");
      const btnRemover = document.createElement("button");
      btnRemover.setAttribute("class", "btn btn-danger");
      btnRemover.setAttribute("type", "button");
      const iconRemover = document.createElement("i");
      iconRemover.setAttribute("class", "fa fa-trash");
      btnRemover.appendChild(iconRemover);
      btnRemover.addEventListener("click", () => this.remover(obj.id));
      tdRemover.appendChild(btnRemover);
      tr.appendChild(tdRemover);
      this.tBody.appendChild(tr);
    });
  }
}

export default Lista;
