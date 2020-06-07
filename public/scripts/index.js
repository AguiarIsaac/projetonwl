const buttonSearch = document.querySelector('#page-home main a') // Const recebe o button do html

const modal = document.querySelector('#modal') //const recebe o modal do html

const close = document.querySelector('#modal .header a') //const recebe o x do modal

buttonSearch.addEventListener('click', () => { // função que ao clicar no button
    modal.classList.remove('hide') // remove a classe ao modal
})

close.addEventListener('click', () => { // função que ao clicar no X
    modal.classList.add('hide') // adiciona a clase hide ao modal fazendo a tela sumir
})