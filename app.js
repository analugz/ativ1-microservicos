const tabelaDados = document.getElementById('tabela-dados');
const formulario = document.getElementById('formulario');
const nomeInput = document.getElementById('nome');
const emailInput = document.getElementById('email');
const enviarButton = document.querySelector('.btn-enviar');
const btnHeader = document.querySelector(".btn-header");
const header = document.querySelector("header");
const inputPesquisar = document.querySelector(".input-pesquisar");
const contactList = document.getElementById("contactList");
const itemInput = document.getElementById("itemInput");
const ageInput = document.getElementById("ageInput");
const addItemBtn = document.getElementById("addItemBtn");

const data = document.getElementById("data");
data.innerText = new Date().getFullYear();

const dadosDefault = [
    { id: 1, nome: "John Doe", email: "GqDyv@example.com" },
    { id: 2, nome: "Jane Smith", email: "jane.smith@example.com" },
    { id: 3, nome: "Alice Johnson", email: "alice.johnson@example.com" },
];

async function buscarDados() {
    tabelaDados.innerHTML = '';
    dadosDefault.forEach(d => adicionarNaTabela(d));
}

async function enviarDados() {
    const nome = nomeInput.value;
    const email = emailInput.value;

    let valido = nome !== '' && email !== '';

    if (nome === '') {
        document.getElementById('erro-nome').textContent = 'Nome é obrigatório';
    } else {
        document.getElementById('erro-nome').textContent = '';
    }

    if (email === '') {
        document.getElementById('erro-email').textContent = 'Email é obrigatório';
    } else {
        document.getElementById('erro-email').textContent = '';
    }

    if (!valido) return;

    const dados = { nome, email };
    adicionarNaTabela(dados);
    alert("Dados enviados com sucesso!");
    formulario.reset();
}

function adicionarNaTabela(dados) {
    const tr = document.createElement('tr');

    tr.innerHTML = `
        <td class="nome">${dados.nome}</td>
        <td class="email">${dados.email}</td>
        <td class="acoes">
            <button class="deletar-btn">Deletar</button>
            <button class="editar-btn">Editar</button>
        </td>
    `;

    const deletarBtn = tr.querySelector(".deletar-btn");
    const editarBtn = tr.querySelector(".editar-btn");

    deletarBtn.addEventListener("click", () => {
        const confirmacao = confirm("Tem certeza que deseja deletar?");
        if (!confirmacao) return;
        tr.remove();
    });

    editarBtn.addEventListener("click", () => {
        if (editarBtn.textContent === "Salvar") {
            const novoNome = tr.querySelector("#editar-nome").value;
            const novoEmail = tr.querySelector("#editar-email").value;

            const confirmacao = confirm("Tem certeza que deseja salvar?");
            if (!confirmacao) return;

            dados.nome = novoNome;
            dados.email = novoEmail;

            tr.querySelector(".nome").textContent = novoNome;
            tr.querySelector(".email").textContent = novoEmail;

            editarBtn.textContent = "Editar";
        } else {
            tr.querySelector(".nome").innerHTML = `<input id="editar-nome" class="editar-input" type="text" value="${dados.nome}">`;
            tr.querySelector(".email").innerHTML = `<input id="editar-email" class="editar-input" type="email" value="${dados.email}">`;
            editarBtn.textContent = "Salvar";
            tr.querySelector("#editar-nome").focus();
        }
    });

    tabelaDados.appendChild(tr);
}

function mudarCor() {
    header.classList.toggle("bg-rosa");
    enviarButton.classList.toggle("bg-rosa");
}

inputPesquisar.addEventListener("input", (e) => {
    const busca = e.target.value.toLowerCase();
    tabelaDados.innerHTML = '';
    dadosDefault
        .filter(d => d.nome.toLowerCase().includes(busca) || d.email.toLowerCase().includes(busca))
        .forEach(d => adicionarNaTabela(d));
});

// Adicionar item à lista
addItemBtn.addEventListener("click", () => {
    const nome = itemInput.value.trim();
    const idade = ageInput.value.trim();

    if (nome === "" || idade === "") {
        alert("Preencha todos os campos!");
        return;
    }

    const li = document.createElement("li");
    li.textContent = `${nome} - ${idade} anos`;

    // Remover item ao clicar
    li.addEventListener("click", () => {
        li.remove();
    });

    contactList.appendChild(li);
    itemInput.value = "";
    ageInput.value = "";
});

window.addEventListener('DOMContentLoaded', buscarDados);
enviarButton.addEventListener('click', enviarDados);
btnHeader.addEventListener("click", mudarCor);
