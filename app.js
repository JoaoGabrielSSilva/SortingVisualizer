import { bubbleSort } from "./algoritmos/bubbleSort.js";
import { bogoSort } from "./algoritmos/bogoSort.js";
import { insertionSort } from "./algoritmos/insertionSort.js";
import { mergeSort } from "./algoritmos/mergeSort.js";
import { quickSort } from "./algoritmos/quickSort.js";
import { selectionSort } from "./algoritmos/selectionSort.js";

//definição das variáveis
const containerLista = document.getElementById('container-lista'); //recebendo o elemento que exibe as barras da lista
const contadorPassos = document.getElementById('contador-passos')  //recebendo o elemento que exibe a contagem de passos

const botoesQuantidade = document.querySelectorAll('.modificador-quantidade-box .btn');

botoesQuantidade.forEach(botao => {
    botao.addEventListener('click', function() {
      const quantidade = parseInt(this.textContent);
      atualizarQuantidade(quantidade);
    });
});

const botoesVelocidade = document.querySelectorAll('.modificador-velocidade-box .btn');

botoesVelocidade.forEach(botao => {
    botao.addEventListener('click', function() {
      const velocidade = parseInt(this.textContent.replace('x', ''));
      atualizarVelocidade(velocidade);
    });
});

const estado = {
    estaOrdenando: false
}

let duracaoPasso = 500; //duração do passo (500 = 0.5 segundo)
let lista = []; // inicializando a lista
let listaAtual = []; // utilizado para armazenar a lista atual para reiniciar
let passos = 0; // inicializando o contador de passos
let quantElementos = 5; // define a quantidade de elementos a serem ordenados

// função que adiciona um passo de acordo com cada ordenação
function atualizarPassos(){
    passos = passos + 1; // adiciona um passo
    contadorPassos.innerHTML = "Passos: " + passos; // atualiza o contador de passos
}

function atualizarQuantidade(quantidade){
    quantElementos = quantidade;
    gerarListaAleatoria(quantElementos);

    passos = 0;
    contadorPassos.innerHTML = "Passos: " + passos; // atualiza o contador de passos
    estado.estaOrdenando = false;
    console.log(quantElementos)
}

function atualizarVelocidade(velocidade){
    duracaoPasso = 1000 / velocidade;
    console.log(duracaoPasso)    
}


//função que gera uma lista aleatória
function gerarListaAleatoria(tamanho) {
    

    lista = Array.from({ length: tamanho }, () => Math.floor(Math.random() * 100) + 1); //gera uma lista com barras de tamanho entre 1 a 300
    listaAtual = Array.from(lista); // cria uma cópia da lista atual para reset
    mostrarLista(); // exibe a lista gerada

}

//função para exibir a lista 
function mostrarLista() {
    const barrasAtivas = document.querySelectorAll('.barra.ativo');
    barrasAtivas.forEach(barra => barra.classList.remove('ativo'));

    containerLista.innerHTML = ''; // define o elemento como um texto vazio
    //para cada valor da lista
    lista.forEach((value) => {
        const barra = document.createElement('div'); // cria-se uma div para ser utilizada como uma barra
        barra.className = 'barra'; // adiciona a classe "barra" para estilização no css
        barra.style.height = `${value * 3}px`; // Escala o valor para conter a altura do elemento
        containerLista.appendChild(barra); // adiciona a barra ao container da lista
    });
}

//função para realizar trocas em diferentes algoritmos de ordenação
function trocar(i, j) {
    [lista[i], lista[j]] = [lista[j], lista[i]];
}

//função que inicia a ordenação ao clicar no botão
export function iniciarOrdenacao() {
    estado.estaOrdenando = true;
    var tipoOrdenacao = document.getElementById("selec-algoritmos"); //recebe o tipo de algoritmo escolhido
    switch (tipoOrdenacao.options[tipoOrdenacao.selectedIndex].text){// verifica qual foi o algoritmo escolhido e realiza a ordenação de acordo com o tipo escolhido
        case 'Bubble Sort':
            bubbleSort(lista, estado, duracaoPasso, trocar, atualizarPassos, mostrarLista);
            break;
        case 'Quick Sort':
            quickSort(lista, estado, duracaoPasso, trocar, atualizarPassos, mostrarLista);
            break;
        case 'Merge Sort':
            mergeSort(lista, estado, duracaoPasso, trocar, atualizarPassos, mostrarLista);
            break;
        case 'Selection Sort':
            selectionSort(lista, estado, duracaoPasso, trocar, atualizarPassos, mostrarLista);
            break;
        case 'Insertion Sort':
            insertionSort(lista, estado, duracaoPasso, trocar, atualizarPassos, mostrarLista);
            break;
        case 'Bogo Sort':
            bogoSort(lista, estado, duracaoPasso, trocar, atualizarPassos, mostrarLista);
            break;
        default:
            break;
    }
    
}

//função que é executada ao clicar no botão de gerar lista
export async function gerarLista() {

    estado.estaOrdenando = false;//define que a lista não está ordenada

    await new Promise(resolve => setTimeout(resolve, duracaoPasso))

    containerLista.innerHTML = '';//define o elemento como um texto vazio

    gerarListaAleatoria(quantElementos);//gera uma lista aleatória
    
    passos = 0;//reinicia a contagem de passos
    contadorPassos.innerHTML = "Passos: " + passos;
}

//função que é executada ao clicar no botão de reiniciar lista
export function reiniciarLista(){
    estado.estaOrdenando = false;//define que a lista não está ordenada
    lista = Array.from(listaAtual);//cria uma cópia dos valores registrados na lista auxiliar para a lista principal
    mostrarLista();// exibe a lista reiniciada
    
    const barrasAtivas = document.querySelectorAll('.barra.ativo');
    barrasAtivas.forEach(barra => barra.classList.remove('ativo'));

    passos = 0;// reinicia a contagem de passos
    contadorPassos.innerHTML = "Passos: " + passos;
}

// Código executado ao iniciar o programa, gerando uma lista inicial com valores aleatórios
gerarListaAleatoria(quantElementos);


