// Exercicio 1 - classe Funcionario
class Funcionario {
  constructor(id, nome, idade, cargo, salario) {
    this._id = id;
    this._nome = nome;
    this._idade = idade;
    this._cargo = cargo;
    this._salario = salario;
  }

  // metodos de acesso (get/set)
  get id() {
    return this._id;
  }

  get nome() {
    return this._nome;
  }
  set nome(valor) {
    this._nome = valor;
  }

  get idade() {
    return this._idade;
  }
  set idade(valor) {
    this._idade = valor;
  }

  get cargo() {
    return this._cargo;
  }
  set cargo(valor) {
    this._cargo = valor;
  }

  get salario() {
    return this._salario;
  }
  set salario(valor) {
    this._salario = valor;
  }

  // Exercicio 2 - usado na edicao p/ trocar os dados de uma vez
  atualizar(nome, idade, cargo, salario) {
    this.nome = nome;
    this.idade = idade;
    this.cargo = cargo;
    this.salario = salario;
  }

  salarioFormatado() {
    return "R$ " + this._salario.toFixed(2).replace(".", ",");
  }

  toString() {
    return this._nome + " - " + this._idade + " anos - " + this._cargo + " - " + this.salarioFormatado();
  }
}
