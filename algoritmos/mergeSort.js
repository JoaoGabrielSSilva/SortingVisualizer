//implementação do merge sort

export async function mergeSort(lista, estado, duracaoPasso, trocar, atualizarPassos, mostrarLista) {
    const barras = document.querySelectorAll('.barra'); // seleciona-se todas as barras

    async function mesclar(inicio, meio, fim) {
        const num1 = meio - inicio + 1;
        const num2 = fim - meio;
        const esquerda = new Array(num1);
        const direita = new Array(num2);

        for(let i = 0; i < num1; i++) {
            esquerda[i] = lista[inicio + i];
        }
        for(let j = 0; j < num2; j++) {
            direita[j] = lista[meio + 1 + j];
        }

        let i = 0, j = 0, k = inicio;

        for(let x = inicio; x <= fim; x++) {
            barras[x].classList.add('chave');
        }

        while(i < num1 && j < num2 && estado.estaOrdenando) {
            const barrasAtuais = document.querySelectorAll('.barra');
            barrasAtuais.forEach(barra => barra.classList.remove('ativo'));

            barras[inicio + i].classList.add('ativo');
            barras[meio + 1 + j].classList.add('ativo');

            barras[inicio + i].classList.remove('chave');
            barras[meio + 1 + j].classList.remove('chave');

            if(esquerda[i] <= direita[j]) {
                lista[k] = esquerda[i];
                i++;
            } else {
                lista[k] = direita[j];
                j++;
            }
            atualizarPassos();
            await new Promise(resolve => setTimeout(resolve, duracaoPasso));
            mostrarLista();

            const barrasAtualizadas = document.querySelectorAll('.barra');
            for(let x = inicio; x <= fim; x++) {
                barrasAtualizadas[x].classList.add('chave');
            }
            if (i < num1){
                barrasAtualizadas[inicio + i].classList.remove('chave');
                barrasAtualizadas[inicio + i].classList.add('ativo');
            }
            if (j < num2){
                barrasAtualizadas[meio + 1 + j].classList.remove('chave');
                barrasAtualizadas[meio + 1 + j].classList.add('ativo');
            }
            k++;
        }

        while (i < num1 && estado.estaOrdenando) {
            barras[k].classList.add('ativo');
            barras[k].classList.remove('chave');

            lista[k] = esquerda[i];
            atualizarPassos();
            await new Promise(resolve => setTimeout(resolve, duracaoPasso));
            mostrarLista();
            
            const barrasAtualizadas = document.querySelectorAll('.barra');
            for(let x = inicio; x <= fim; x++) {
                barrasAtualizadas[x].classList.add('chave');
            }
            barrasAtualizadas[k].classList.remove('chave');
            barrasAtualizadas[k].classList.add('ativo');
            
            i++;
            k++;

        }

        while (j < num2 && estado.estaOrdenando) {
            barras[k].classList.add('ativo');
            barras[k].classList.remove('chave');

            lista[k] = direita[j];
            atualizarPassos();
            await new Promise(resolve => setTimeout(resolve, duracaoPasso));
            mostrarLista();

            const barrasAtualizadas = document.querySelectorAll('.barra');
            for(let x = inicio; x <= fim; x++) {
                barrasAtualizadas[x].classList.add('chave');
            }
            barrasAtualizadas[k].classList.remove('chave');
            barrasAtualizadas[k].classList.add('ativo');

            j++;
            k++;
        }
    }

    async function mergeSortRecursivo(inicio, fim) {
        if(inicio < fim && estado.estaOrdenando) {
            const meio = Math.floor((inicio + fim) / 2);
            await mergeSortRecursivo(inicio, meio);
            await mergeSortRecursivo(meio + 1, fim);
            await mesclar(inicio, meio, fim);
        }
    }
    
    await mergeSortRecursivo(0, lista.length - 1);

    const barrasFinais = document.querySelectorAll('.barra');
    barrasFinais.forEach(barra => {
        barra.classList.remove('ativo');
        barra.classList.remove('chave');
    });
}