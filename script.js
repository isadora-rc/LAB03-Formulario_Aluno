let alunos = [];

const formAluno = document.getElementById('formAluno');
const tabelaAlunos = document.getElementById('tabelaAlunos').getElementsByTagName('tbody')[0];

function atualizarTabela() {
    tabelaAlunos.innerHTML = ''; // limpa tabela
    alunos.forEach((aluno, index) => {
        let linha = tabelaAlunos.insertRow();
        linha.innerHTML = `
            <td>${aluno.nome}</td>
            <td>${aluno.idade}</td>
            <td>${aluno.curso}</td>
            <td>${aluno.notaFinal}</td>
            <td>
                <button class="btn btn-warning" onclick="editarAluno(${index})">Editar</button>
                <button class="btn btn-danger" onclick="excluirAluno(${index})">Excluir</button>
            </td>
        `;
    });
}

formAluno.addEventListener('submit', function(event) {
    event.preventDefault(); //impede o recarregamento da página

    const nome = document.getElementById('nome').value;
    const idade = parseInt(document.getElementById('idade').value);
    const curso = document.getElementById('curso').value;
    const notaFinal = parseFloat(document.getElementById('notaFinal').value);

    alunos.push({ nome, idade, curso, notaFinal });

    atualizarTabela();

    //limpa o formulário
    formAluno.reset();
});
