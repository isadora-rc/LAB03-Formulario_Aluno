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

        alert(`Aluno ${nome} cadastrado com sucesso!`);
        console.log (`Cadastro:`, novoAluno.toString());

    } else {
        //editar aluno existente
        alunos[indiceEdicao].nome = nome;
        alunos[indiceEdicao].idade = idade;
        alunos[indiceEdicao].curso = curso;
        alunos[indiceEdicao].notaFinal = notaFinal;

        alert(`Aluno ${nome} atualizado com sucesso!`);
        console.log(`Edição:`, alunos[indiceEdicao].toString());

        indiceEdicao = null;
    }

    formAluno.reset();
    atualizarTabela();
});

//atualiza a tabela
const atualizarTabela = () => {
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
                <button class="btn btn-warning btn-sm" >Editar</button>
                <button class="btn btn-danger btn-sm" >Excluir</button>
            </td>
        `;

        tr.querySelector('.btn-warning').addEventListener('click', function() {
            editarAluno(index);
        });
        tr.querySelector('.btn-danger').addEventListener('click', function() {
            excluirAluno(index);
        });

        corpoTabela.appendChild(tr);
    });
}

//editar aluno
const editarAluno = (index) => {
    const aluno = alunos[index];
    document.getElementById('nome').value = aluno.nome;
    document.getElementById('idade').value = aluno.idade;
    document.getElementById('curso').value = aluno.curso;
    document.getElementById('notaFinal').value = aluno.notaFinal;
    indiceEdicao = index;
}

//excluir aluno
const excluirAluno = (index) => {
    const nome = alunos[index].nome;
    alunos.splice(index, 1);
    atualizarTabela();
    alert(`Aluno ${nome} excluído com sucesso!`); // Exercicio 3
    console.log(`Exclusão: ${nome}`);
}

const relatorioDiv = document.getElementById('relatorio');

document.getElementById('btnAprovados').addEventListener('click', () => {
    const aprovados = alunos.filter(aluno => aluno.isAprovado());
    relatorioDiv.innerHTML = `<strong>Alunos Aprovados:</strong><br>${aprovados.map(a => a.nome).join(', ') || 'Nenhum aluno aprovado'}`;
});

document.getElementById('btnMediaNotas').addEventListener('click', () => {
    if (alunos.length === 0) {
        relatorioDiv.innerHTML = 'Nenhum aluno cadastrado.';
        return;
    }
    const mediaNotas = alunos.reduce((acc, aluno) => acc + aluno.notaFinal, 0) / alunos.length;
    relatorioDiv.innerHTML = `<strong>Média das Notas Finais:</strong> ${mediaNotas.toFixed(2)}`;
});

document.getElementById('btnMediaIdade').addEventListener('click', () => {
    if (alunos.length === 0) {
        relatorioDiv.innerHTML = 'Nenhum aluno cadastrado.';
        return;
    }
    const mediaIdade = alunos.reduce((acc, aluno) => acc + aluno.idade, 0) / alunos.length;
    relatorioDiv.innerHTML = `<strong>Média das Idades:</strong> ${mediaIdade.toFixed(2)}`;
});

document.getElementById('btnNomesAlfabetico').addEventListener('click', () => {
    const nomes = alunos.map(a => a.nome).sort();
    relatorioDiv.innerHTML = `<strong>Nomes em Ordem Alfabética:</strong><br>${nomes.join(', ') || 'Nenhum aluno cadastrado'}`;
});

document.getElementById('btnQtdPorCurso').addEventListener('click', () => {
    const contagem = alunos.reduce((acc, aluno) => {
        acc[aluno.curso] = (acc[aluno.curso] || 0) + 1;
        return acc;
    }, {});
    relatorioDiv.innerHTML = `<strong>Quantidade de Alunos por Curso:</strong><br>${Object.entries(contagem).map(([curso, qtd]) => `${curso}: ${qtd}`).join('<br>')}`;
});