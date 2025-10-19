class Aluno {
    constructor(nome, idade, curso, notaFinal) {
        this.nome = nome;
        this.idade = idade;
        this.curso = curso;
        this.notaFinal = notaFinal;
    }

    isAprovado() {
        return this.notaFinal >= 7;
    }

    toString() {
        return `${this.nome}, ${this.idade} anos, Curso: ${this.curso}, Nota Final: ${this.notaFinal}`;
    }
}

let alunos = [];
let indiceEdicao = null;

const formAluno = document.getElementById('formAluno');
const corpoTabela = document.getElementById('corpoTabela');

formAluno.addEventListener('submit', function(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const idade = parseInt(document.getElementById('idade').value);
    const curso = document.getElementById('curso').value;
    const notaFinal = parseFloat(document.getElementById('notaFinal').value);

    if (indiceEdicao === null) {
        //criar novo aluno
        const novoAluno = new Aluno(nome, idade, curso, notaFinal);
        alunos.push(novoAluno);
    } else {
        //editar aluno existente
        alunos[indiceEdicao].nome = nome;
        alunos[indiceEdicao].idade = idade;
        alunos[indiceEdicao].curso = curso;
        alunos[indiceEdicao].notaFinal = notaFinal;
        indiceEdicao = null;
    }

    formAluno.reset();
    atualizarTabela();
});

//atualiza a tabela
function atualizarTabela() {
    corpoTabela.innerHTML = '';

    alunos.forEach((aluno, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${aluno.nome}</td>
            <td>${aluno.idade}</td>
            <td>${aluno.curso}</td>
            <td>${aluno.notaFinal}</td>
            <td>${aluno.isAprovado() ? 'Sim' : 'Não'}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="editarAluno(${index})">Editar</button>
                <button class="btn btn-danger btn-sm" onclick="excluirAluno(${index})">Excluir</button>
            </td>
        `;
        corpoTabela.appendChild(tr);
    });
}

//editar aluno
function editarAluno(index) {
    const aluno = alunos[index];
    document.getElementById('nome').value = aluno.nome;
    document.getElementById('idade').value = aluno.idade;
    document.getElementById('curso').value = aluno.curso;
    document.getElementById('notaFinal').value = aluno.notaFinal;
    indiceEdicao = index;
}

//excluir aluno
function excluirAluno(index) {
    alunos.splice(index, 1);
    atualizarTabela();
}
