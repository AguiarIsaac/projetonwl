function populateUfs(){ // Criação de funcção
    const ufSelect = document.querySelector('select[name=uf]'); //Procura no HTML um elemento select com name UF
    fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome') //Interface que busca recursos em toda internet
    .then((res) => {return res.json()}) //Volta uma nova promise criando um Json com o conteudo da API. a function tbm pode ser representada, nesse caso como: 'res => {res.json}'
    .then(states =>{ //Sintaxe de definição de Arrow function: '() => {}'
       for( const state of states ) { // Estrutura de repetição para adicionar todos os estados do Json no html
        ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>` // Pega o valor dentro o HTMl e Adiciona uma option utilizando valores da const states
       }
    })
}
populateUfs() // Chama a função para que ela seja executada

function getCities(event) {
    const citysSelect = document.querySelector('select[name=city]') //Procura no HTML um elemento select com name cidades
    const stateInput = document.querySelector('input[name=state]')

    const ufValue = event.target.value // Recebe o valor selecionado no campo de estado

    const indexOfSelectedState = event.target.selectedIndex // Add a var o valor selecionado no estado
    stateInput.value = event.target.options[indexOfSelectedState].text  // Adiciona o valor no input

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios` // Vai armazenar lista de cidades do estado selecionado

    citysSelect.innerHTML = '<option value>Selecione a cidade</option>' // Limpa a caixa de cidades
    citysSelect.desabled = true // Bloqueia a escolha de cidades

    fetch(url) //Interface que busca recursos em toda internet
    .then((res) => {return res.json()}) //Volta uma nova promise criando um Json com o conteudo da API. a function tbm pode ser representada, nesse caso como: 'res => {res.json}'
    .then(cities =>{ //Sintaxe de definição de Arrow function: '() => {}'
       for( const city of cities ) { // Estrutura de repetição para adicionar todos as cidades de acordo com o estado selecionado
        citysSelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>` // Pega o valor dentro o HTMl e Adiciona uma option utilizando valores da const city
       }
       citysSelect.disabled = false
    })
}

document
    .querySelector('select[name=uf') //Procura no HTML um elemento select com name UF
    .addEventListener('change', getCities)//Ouvidor de eventos que executa uma function mediante uma change. Ao mencionar a função sem os (), só será execuada apos mudança

//Itens de coleta

const itemsTocollect = document.querySelectorAll('.items-grid li') // Pega todos os elementos li do html

for(const item of itemsTocollect) { // para cada item do itemsTocollect..
    item.addEventListener('click', handleSelectedItem) //Ouvidor de eventos que executa uma function mediante um click.
}

let selectedItems = [] // Criação de Array
const collectedItems = document.querySelector('input[name=items]') //Procura no HTML um elemento select com name itens e add a const

function handleSelectedItem(event) { //Criação de função
    const itemLi = event.target // recebe o valor do li clicado
    
    itemLi.classList.toggle('selected') // Adiciona ou remove uma classe do li

    const itemId = itemLi.dataset.id //Criação de constante e recebe a id do LI clicado

    //Verificar se existe itens selecionados, se sim pegar os itens selecionados
    const alreadySelected = selectedItems.findIndex( (item) => { //Criação de constante que irá procurar o index,
        const itemFound = item == itemId // irá rodar a funcção ate item ser igual ao itemId. retornará True ou False
        return itemFound
    })

    //Se já estiver selecionado, retirar
    if(alreadySelected >= 0) {
        const filteredItems = selectedItems.filter( (item) => { //Criação de constante que irá filtar itens encontrados que ja foram selecionados
            const itemIsDifferent = item != itemId //
            return itemIsDifferent
        })
        selectedItems = filteredItems
    } else { //Se não estiver selecionado, adicionar a seleção
        selectedItems.push(itemId) //Adiciona elemento no array

    }
    //Atualizar o campo escondido com os itens selecionados
    collectedItems.value = selectedItems // adiciona value ao input escondido
}