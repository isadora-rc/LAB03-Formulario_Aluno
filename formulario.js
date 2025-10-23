//classe Aluno
class Aluno {
    constructor(nome, idade, curso, notaFinal) {
        this._id = Date.now();  // ID único
        this._nome = nome;
        this._idade = idade;
        this._curso = curso;
        this._notaFinal = notaFinal;
    }

    //getters
    get id() { return this._id; }
    get nome() { return this._nome; }
    get idade() { return this._idade; }
    get curso() { return this._curso; }
    get notaFinal() { return this._notaFinal; }

    //setters
    set nome(n) { this._nome = n; }
    set idade(i) { this._idade = i; }
    set curso(c) { this._curso = c; }
    set notaFinal(nf) { this._notaFinal = nf; }

    //métodos
    isAprovado() {
        return this._notaFinal >= 7;
    }

    toString() {
        return `${this._nome} - ${this._idade} anos - Curso: ${this._curso} - Nota Final: ${this._notaFinal}`;
    }
}

//classe controller
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

        //botões de relatório
        document.getElementById("relAprovados").addEventListener("click", () => this.mostrarAprovados());
        document.getElementById("relMediaNotas").addEventListener("click", () => this.mostrarMediaNotas());
        document.getElementById("relMediaIdade").addEventListener("click", () => this.mostrarMediaIdades());
        document.getElementById("relNomes").addEventListener("click", () => this.mostrarNomesAlfabetico());
        document.getElementById("relCursos").addEventListener("click", () => this.mostrarQtdPorCurso());
    }

    salvar() {
        const nome = document.getElementById("nome").value;
        const idade = document.getElementById("idade").value;
        const curso = document.getElementById("curso").value;
        const notaFinal = Number(document.getElementById("notaFinal").value);

        if (this.editando !== null) {
            //editar aluno existente
            const aluno = this.alunos[this.editando];
            aluno.nome = nome;
            aluno.idade = idade;
            aluno.curso = curso;
            aluno.notaFinal = notaFinal;
            alert(`Aluno ${nome} editado com sucesso!`);
            console.log(`Aluno editado: ${aluno.toString()}`);
            this.editando = null;
        } else {
            // novo aluno
            const aluno = new Aluno(nome, idade, curso, notaFinal);
            this.alunos.push(aluno);
            alert(`Aluno ${nome} cadastrado com sucesso!`);
            console.log(`Aluno cadastrado: ${aluno.toString()}`);
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
        alert(`Editando aluno: ${aluno.nome}`);
        console.log(`Editando aluno: ${aluno.toString()}`);
    }

    excluir(index) {
        const aluno = this.alunos[index];
        this.alunos = this.alunos.filter((_, i) => i !== index);
        this.atualizarTabela();
        alert(`Aluno ${aluno.nome} excluído!`);
        console.log(`Aluno excluído: ${aluno.toString()}`);
    }

    //relatórios
    mostrarAprovados = () => {
        const lista = this.alunos.filter(a => a.isAprovado());
        const div = document.getElementById("resultado");
        div.innerHTML = `<b>Alunos aprovados:</b><br>` + (lista.length > 0 ? lista.map(a => a.toString()).join("<br>") : "Nenhum");
    }

    mostrarMediaNotas = () => {
        if(this.alunos.length === 0) return alert("Nenhum aluno cadastrado.");
        const media = this.alunos.reduce((acc, a) => acc + a.notaFinal, 0) / this.alunos.length;
        document.getElementById("resultado").innerHTML = `<b>Média das notas:</b> ${media.toFixed(2)}`;
    }

    mostrarMediaIdades = () => {
        if(this.alunos.length === 0) return alert("Nenhum aluno cadastrado.");
        const media = this.alunos.reduce((acc, a) => acc + Number(a.idade), 0) / this.alunos.length;
        document.getElementById("resultado").innerHTML = `<b>Média das idades:</b> ${media.toFixed(2)}`;
    }

    mostrarNomesAlfabetico = () => {
        const nomes = this.alunos.map(a => a.nome).sort();
        document.getElementById("resultado").innerHTML = `<b>Nomes em ordem alfabética:</b> ${nomes.join(", ")}`;
    }

    mostrarQtdPorCurso = () => {
        const cursos = {};
        this.alunos.forEach(a => {
            cursos[a.curso] = (cursos[a.curso] || 0) + 1;
        });
        document.getElementById("resultado").innerHTML = `<b>Quantidade de alunos por curso:</b> ${Object.entries(cursos).map(([c, q]) => `${c}: ${q}`).join(", ")}`;
    }
}

//inicializa o controller
const controller = new AlunoController();
