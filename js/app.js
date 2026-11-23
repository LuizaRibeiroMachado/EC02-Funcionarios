// array de objetos da classe Funcionario (fica so em memoria)
let funcionarios = [];
let proximoId = 1;

// id do funcionario que esta sendo editado (null = cadastro novo)
let idEdicao = null;

// texto da busca por nome e ultimo relatorio aberto
let filtroNome = "";
let relatorioAtual = null;

const campoNome = document.getElementById("nome");
const campoIdade = document.getElementById("idade");
const campoCargo = document.getElementById("cargo");
const campoSalario = document.getElementById("salario");
const campoBusca = document.getElementById("campoBusca");
const btnCadastrar = document.getElementById("btnCadastrar");
const btnCancelar = document.getElementById("btnCancelar");
const tituloForm = document.getElementById("tituloForm");
const tabela = document.getElementById("tabelaFuncionarios");
const divRelatorio = document.getElementById("relatorio");

// ---------- Exercicio 3: manipulacao do array com arrow functions ----------

// busca pelo id
const buscarPorId = (id) => funcionarios.find((f) => f.id === id);

// busca pelo nome (pedaco do nome, sem diferenciar maiuscula)
const buscarPorNome = (texto) =>
  funcionarios.filter((f) => f.nome.toLowerCase().includes(texto.toLowerCase()));

const adicionarFuncionario = (nome, idade, cargo, salario) => {
  const novo = new Funcionario(proximoId, nome, idade, cargo, salario);
  proximoId++;
  funcionarios.push(novo);
  return novo;
};

const removerFuncionario = (id) => {
  funcionarios = funcionarios.filter((f) => f.id !== id);
};

// usa o metodo da classe pra atualizar os atributos
const atualizarFuncionario = (id, nome, idade, cargo, salario) => {
  const f = buscarPorId(id);
  if (f) {
    f.atualizar(nome, idade, cargo, salario);
  }
  return f;
};

// ---------- formulario ----------

const limparFormulario = () => {
  campoNome.value = "";
  campoIdade.value = "";
  campoCargo.value = "";
  campoSalario.value = "";
  idEdicao = null;
  btnCadastrar.textContent = "Cadastrar";
  tituloForm.textContent = "Cadastrar funcionário";
  btnCancelar.classList.add("d-none");
};

const formularioValido = () => {
  if (campoNome.value.trim() === "" || campoCargo.value.trim() === "" ||
      campoIdade.value === "" || campoSalario.value === "") {
    alert("Preencha todos os campos!");
    return false;
  }
  if (Number(campoIdade.value) <= 0) {
    alert("Idade inválida!");
    return false;
  }
  if (Number(campoSalario.value) < 0) {
    alert("Salário inválido!");
    return false;
  }
  return true;
};

// ---------- tabela ----------

const criarCelula = (texto) => {
  const td = document.createElement("td");
  td.textContent = texto;
  return td;
};

const renderizarTabela = () => {
  tabela.innerHTML = "";

  const lista = filtroNome === "" ? funcionarios : buscarPorNome(filtroNome);

  if (lista.length === 0) {
    const tr = document.createElement("tr");
    const td = criarCelula("Nenhum funcionário encontrado.");
    td.colSpan = 6;
    td.className = "text-center text-muted";
    tr.appendChild(td);
    tabela.appendChild(tr);
    return;
  }

  lista.forEach((f) => {
    const tr = document.createElement("tr");
    tr.appendChild(criarCelula(f.id));
    tr.appendChild(criarCelula(f.nome));
    tr.appendChild(criarCelula(f.idade));
    tr.appendChild(criarCelula(f.cargo));
    tr.appendChild(criarCelula(f.salarioFormatado()));

    const tdAcoes = document.createElement("td");

    const btnEditar = document.createElement("button");
    btnEditar.className = "btn btn-sm btn-warning me-1";
    btnEditar.textContent = "Editar";
    // onclick com funcao anonima
    btnEditar.onclick = function () {
      const func = buscarPorId(f.id);
      campoNome.value = func.nome;
      campoIdade.value = func.idade;
      campoCargo.value = func.cargo;
      campoSalario.value = func.salario;
      idEdicao = func.id;
      btnCadastrar.textContent = "Salvar";
      tituloForm.textContent = "Editar funcionário";
      btnCancelar.classList.remove("d-none");
      campoNome.focus();
    };

    const btnExcluir = document.createElement("button");
    btnExcluir.className = "btn btn-sm btn-danger";
    btnExcluir.textContent = "Excluir";
    btnExcluir.onclick = function () {
      if (!confirm("Excluir " + f.nome + "?")) {
        return;
      }
      removerFuncionario(f.id);
      console.log("Excluido: " + f.toString());
      limparFormulario();
      atualizarTela();
    };

    tdAcoes.appendChild(btnEditar);
    tdAcoes.appendChild(btnExcluir);
    tr.appendChild(tdAcoes);
    tabela.appendChild(tr);
  });
};

// ---------- Exercicio 4: relatorios (filter, map, reduce, Set) ----------

const mostrarLista = (titulo, itens) => {
  divRelatorio.innerHTML = "";
  const h = document.createElement("h6");
  h.textContent = titulo;
  divRelatorio.appendChild(h);

  if (itens.length === 0) {
    const p = document.createElement("p");
    p.className = "mb-0";
    p.textContent = "Nada para mostrar.";
    divRelatorio.appendChild(p);
    return;
  }

  const ul = document.createElement("ul");
  ul.className = "mb-0";
  itens.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    ul.appendChild(li);
  });
  divRelatorio.appendChild(ul);
};

const relatorioSalarioMaior = () => {
  const lista = funcionarios.filter((f) => f.salario > 5000).map((f) => f.toString());
  mostrarLista("Funcionários com salário maior que R$ 5000 (" + lista.length + ")", lista);
};

const relatorioMediaSalarial = () => {
  if (funcionarios.length === 0) {
    mostrarLista("Média salarial", []);
    return;
  }
  const total = funcionarios.reduce((soma, f) => soma + f.salario, 0);
  const media = total / funcionarios.length;
  mostrarLista("Média salarial", ["R$ " + media.toFixed(2).replace(".", ",")]);
};

const relatorioCargosUnicos = () => {
  // o Set tira os repetidos
  const cargos = [...new Set(funcionarios.map((f) => f.cargo))];
  mostrarLista("Cargos únicos (" + cargos.length + ")", cargos);
};

const relatorioNomesMaiusculo = () => {
  const nomes = funcionarios.map((f) => f.nome.toUpperCase());
  mostrarLista("Nomes em maiúsculo", nomes);
};

// redesenha a tabela e o relatorio aberto (relatorio dinamico)
const atualizarTela = () => {
  renderizarTabela();
  if (relatorioAtual !== null) {
    relatorioAtual();
  }
};

// ---------- eventos dos botoes ----------

// cadastro / salvar edicao -> funcao anonima tradicional
btnCadastrar.onclick = function () {
  if (!formularioValido()) {
    return;
  }

  const nome = campoNome.value.trim();
  const idade = Number(campoIdade.value);
  const cargo = campoCargo.value.trim();
  const salario = Number(campoSalario.value);

  if (idEdicao === null) {
    const novo = adicionarFuncionario(nome, idade, cargo, salario);
    console.log("Cadastrado: " + novo.toString());
  } else {
    const editado = atualizarFuncionario(idEdicao, nome, idade, cargo, salario);
    console.log("Editado: " + editado.toString());
  }

  limparFormulario();
  atualizarTela();
};

// Exercicio 3 - trocando funcao anonima por arrow function.
// Antes era assim:
//
//   btnCancelar.onclick = function () {
//     limparFormulario();
//   };
//
// Com arrow function fica:
btnCancelar.onclick = () => {
  limparFormulario();
};

// obs: as duas fazem a mesma coisa aqui. A diferenca e que a arrow function
// nao tem "this" proprio, entao se precisar do this do botao tem que usar function.

document.getElementById("btnBuscar").onclick = function () {
  filtroNome = campoBusca.value.trim();
  renderizarTabela();
};

document.getElementById("btnLimparBusca").onclick = function () {
  filtroNome = "";
  campoBusca.value = "";
  renderizarTabela();
};

document.getElementById("btnSalarioMaior").onclick = function () {
  relatorioAtual = relatorioSalarioMaior;
  relatorioAtual();
};

document.getElementById("btnMediaSalarial").onclick = function () {
  relatorioAtual = relatorioMediaSalarial;
  relatorioAtual();
};

document.getElementById("btnCargosUnicos").onclick = function () {
  relatorioAtual = relatorioCargosUnicos;
  relatorioAtual();
};

document.getElementById("btnNomesMaiusculo").onclick = function () {
  relatorioAtual = relatorioNomesMaiusculo;
  relatorioAtual();
};

renderizarTabela();
