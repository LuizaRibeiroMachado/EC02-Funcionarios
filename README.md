# EC02 - Estudo de Caso Funcionários

Estudo de caso: **Sistema de Gestão de Funcionários de uma Startup de Tecnologia**.

Sistema no navegador para cadastrar, listar, alterar e excluir funcionários e gerar relatórios. Feito em HTML e JavaScript, com layout em Bootstrap 5. Os dados ficam em memória (array de objetos).

## Estrutura

```
EC02-Funcionarios/
├── index.html           Formulário, tabela e relatórios
├── js/
│   ├── Funcionario.js   Classe Funcionario
│   └── app.js           Cadastro, edição, exclusão, busca e relatórios
├── Dockerfile
└── docker-compose.yml
```

## Como executar com Docker

```bash
docker compose up --build
```

Depois abrir <http://localhost:8080>

Para parar: `docker compose down`

## Exercícios

### Exercício 1 - Cadastro e Listagem

- Formulário com Nome, Idade, Cargo e Salário.
- Classe `Funcionario` com construtor, get/set de cada atributo e `toString()`.
- O botão "Cadastrar" coloca o funcionário no array e a tabela é montada pelo JavaScript.

### Exercício 2 - Excluir e Alterar

- Cada linha da tabela tem os botões "Editar" e "Excluir".
- "Editar" carrega os dados no formulário. Ao salvar, os atributos são atualizados pelo método `atualizar()` da classe (que usa os set).
- Eventos com `onclick` e funções anônimas.

### Exercício 3 - Funções Anônimas e Lambda

- Cliques dos botões com função anônima (`function () { ... }`).
- Manipulação do array com arrow functions: `buscarPorId`, `buscarPorNome`, `adicionarFuncionario`, `removerFuncionario` e `atualizarFuncionario`.
- Troca de função anônima por arrow function (botão Cancelar, em `js/app.js`):

```js
// antes
btnCancelar.onclick = function () {
  limparFormulario();
};

// depois
btnCancelar.onclick = () => {
  limparFormulario();
};
```

### Exercício 4 - Relatórios

| Relatório | Método |
| --- | --- |
| Salário maior que R$ 5000 | `filter` + `map` |
| Média salarial | `reduce` |
| Cargos únicos | `map` + `new Set()` |
| Nomes em maiúsculo | `map` |

O relatório aberto atualiza sozinho quando um funcionário é cadastrado, editado ou excluído.

## Tecnologias

- HTML5
- JavaScript
- Bootstrap 5
- Docker (nginx)
- Git e GitHub
