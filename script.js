// classe Aluno
class Aluno {
    constructor(nome, idade, curso, notaFinal) {
        this._id = Date.now();  // ID único
        this._nome = nome;
        this._idade = idade;
        this._curso = curso;
        this._notaFinal = notaFinal;
    }

    // getters
    get id() { return this._id; }
    get nome() { return this._nome; }
    get idade() { return this._idade; }
    get curso() { return this._curso; }
    get notaFinal() { return this._notaFinal; }

    // setters
    set nome(n) { this._nome = n; }
    set idade(i) { this._idade = i; }
    set curso(c) { this._curso = c; }
    set notaFinal(n) { this._notaFinal = n; }

    // métodos
    isAprovado() {
        return this._notaFinal >= 7;
    }

    toString() {
        return `${this._nome} - ${this._idade} anos - Curso: ${this._curso} - Nota: ${this._notaFinal}`;
    }
}

// classe controller
class AlunoController {
    constructor() {
        this.alunos = [];
        this.editando = null;
        this.init();
    }

    init() {
        document.getElementById("salvar").addEventListener("click", (e) => {
            e.preventDefault();
            this.salvar();
        });

        // botões de relatório
        document.getElementById("relAprovados").addEventListener("click", () => this.mostrarAprovados());
        document.getElementById("relMediaNotas").addEventListener("click", () => this.mostrarMediaNotas());
        document.getElementById("relMediaIdade").addEventListener("click", () => this.mostrarMediaIdade());
        document.getElementById("relNomes").addEventListener("click", () => this.mostrarNomesOrdem());
        document.getElementById("relCursos").addEventListener("click", () => this.mostrarAlunosPorCurso());
    }

    salvar() {
        const nome = document.getElementById("nome").value;
        const idade = Number(document.getElementById("idade").value);
        const curso = document.getElementById("curso").value;
        const notaFinal = Number(document.getElementById("notaFinal").value);

        if (this.editando !== null) {
            const a = this.alunos[this.editando];
            a.nome = nome;
            a.idade = idade;
            a.curso = curso;
            a.notaFinal = notaFinal;
            this.editando = null;
        } else {
            const aluno = new Aluno(nome, idade, curso, notaFinal);
            this.alunos.push(aluno);
        }

        this.atualizarTabela();
        this.limparFormulario();
    }

    atualizarTabela() {
        const tabela = document.getElementById("tabela");
        tabela.innerHTML = "";

        this.alunos.forEach((aluno, index) => {
            const row = tabela.insertRow();
            row.insertCell(0).innerText = index + 1;
            row.insertCell(1).innerText = aluno.nome;
            row.insertCell(2).innerText = aluno.idade;
            row.insertCell(3).innerText = aluno.curso;
            row.insertCell(4).innerText = aluno.notaFinal;

            const cellAcoes = row.insertCell(5);

            const botaoEditar = document.createElement("button");
            botaoEditar.innerText = "Editar";
            botaoEditar.type = "button";
            botaoEditar.addEventListener("click", () => this.editar(index));
            cellAcoes.appendChild(botaoEditar);

            const botaoExcluir = document.createElement("button");
            botaoExcluir.innerText = "Excluir";
            botaoExcluir.type = "button";
            botaoExcluir.addEventListener("click", () => this.excluir(index));
            cellAcoes.appendChild(botaoExcluir);
        });
    }

    limparFormulario() {
        document.getElementById('nome').value = '';
        document.getElementById('idade').value = '';
        document.getElementById('curso').value = '';
        document.getElementById('notaFinal').value = '';
    }

    editar(index) {
        const aluno = this.alunos[index];
        document.getElementById('nome').value = aluno.nome;
        document.getElementById('idade').value = aluno.idade;
        document.getElementById('curso').value = aluno.curso;
        document.getElementById('notaFinal').value = aluno.notaFinal;
        this.editando = index;
    }

    excluir(index) {
        this.alunos = this.alunos.filter((_, i) => i !== index);
        this.atualizarTabela();
    }

    // relatórios
    mostrarAprovados = () => {
        const lista = this.alunos.filter(a => a.isAprovado());
        const div = document.getElementById("resultado");
        div.innerHTML = `<b>Alunos Aprovados (nota >= 7):</b><br>` +
            (lista.length > 0 ? lista.map(a => a.toString()).join("<br>") : "Nenhum");
    }

    mostrarMediaNotas = () => {
        if (this.alunos.length === 0) return alert("Nenhum aluno cadastrado.");
        const media = this.alunos.reduce((acc, a) => acc + a.notaFinal, 0) / this.alunos.length;
        document.getElementById("resultado").innerHTML = `<b>Média das notas:</b> ${media.toFixed(2)}`;
    }

    mostrarMediaIdade = () => {
        if (this.alunos.length === 0) return alert("Nenhum aluno cadastrado.");
        const media = this.alunos.reduce((acc, a) => acc + a.idade, 0) / this.alunos.length;
        document.getElementById("resultado").innerHTML = `<b>Média das idades:</b> ${media.toFixed(2)}`;
    }

    mostrarNomesOrdem = () => {
        const nomes = this.alunos.map(a => a.nome).sort();
        document.getElementById("resultado").innerHTML = `<b>Nomes em ordem alfabética:</b> ${nomes.join(", ")}`;
    }

    mostrarAlunosPorCurso = () => {
        const cursos = {};
        this.alunos.forEach(a => {
            cursos[a.curso] = (cursos[a.curso] || 0) + 1;
        });
        let texto = Object.entries(cursos).map(([curso, qtd]) => `${curso}: ${qtd}`).join("<br>");
        document.getElementById("resultado").innerHTML = `<b>Quantidade de alunos por curso:</b><br>${texto || "Nenhum"}`;
    }
}

// Inicializa o controller
const controller = new AlunoController();
