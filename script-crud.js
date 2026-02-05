const btnAdicionarTarefa = document.querySelector(".app__button--add-task")
const formulario = document.querySelector(".app__form-add-task")
const textarea = document.querySelector(".app__form-textarea")
const listaTarefas = document.querySelector(".app__section-task-list")
const btnCancelar = document.querySelector(".app__form-footer__button--cancel")
const btnDeletar = document.querySelector(".app__form-footer__button--delete")

let tarefas = JSON.parse(localStorage.getItem("tarefas")) || []
let tarefaEmEdicao = null

// ---------- abrir formulário ----------
btnAdicionarTarefa.addEventListener("click", () => {
    formulario.classList.remove("hidden")
    textarea.focus()
})

// ---------- cancelar ----------
btnCancelar.addEventListener("click", () => {
    formulario.classList.add("hidden")
    textarea.value = ""
    tarefaEmEdicao = null
})

// ---------- deletar (quando estiver editando) ----------
btnDeletar.addEventListener("click", () => {
    if (!tarefaEmEdicao) return

    tarefas = tarefas.filter(t => t.id !== tarefaEmEdicao.id)
    atualizarTarefas()

    formulario.classList.add("hidden")
    textarea.value = ""
    tarefaEmEdicao = null
})

// ---------- salvar tarefa ----------
formulario.addEventListener("submit", (evento) => {
    evento.preventDefault()

    const texto = textarea.value.trim()

    if (texto === "") {
        alert("A tarefa não pode ficar vazia.")
        return
    }

    if (tarefaEmEdicao) {
        tarefaEmEdicao.descricao = texto
    } else {
        const novaTarefa = {
            id: Date.now(),
            descricao: texto
        }
        tarefas.push(novaTarefa)
    }

    atualizarTarefas()
    formulario.classList.add("hidden")
    textarea.value = ""
    tarefaEmEdicao = null
})

// ---------- criar elemento da tarefa ----------
function criarElementoTarefa(tarefa) {
    const li = document.createElement("li")
    li.classList.add("app__section-task-list-item")

    const paragrafo = document.createElement("p")
    paragrafo.textContent = tarefa.descricao
    paragrafo.classList.add("app__section-task-list-item-description")

    const botaoEditar = document.createElement("button")
    botaoEditar.textContent = "Editar"

    const botaoExcluir = document.createElement("button")
    botaoExcluir.textContent = "Excluir"

    // editar
    botaoEditar.onclick = () => {
        formulario.classList.remove("hidden")
        textarea.value = tarefa.descricao
        textarea.focus()
        tarefaEmEdicao = tarefa
    }

    // excluir
    botaoExcluir.onclick = () => {
        const confirmar = confirm("Deseja excluir esta tarefa?")
        if (!confirmar) return

        tarefas = tarefas.filter(t => t.id !== tarefa.id)
        atualizarTarefas()
    }

    li.append(paragrafo, botaoEditar, botaoExcluir)
    return li
}

// ---------- renderizar tarefas ----------
function renderizarTarefas() {
    listaTarefas.innerHTML = ""

    tarefas.forEach(tarefa => {
        listaTarefas.appendChild(criarElementoTarefa(tarefa))
    })
}

// ---------- atualizar ----------
function atualizarTarefas() {
    localStorage.setItem("tarefas", JSON.stringify(tarefas))
    renderizarTarefas()
}

// ---------- iniciar ----------
renderizarTarefas()
