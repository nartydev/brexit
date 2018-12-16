const socket = io.connect();
let idSocket

const quizContainer = [...document.querySelectorAll('.container-question')]
const infoRound = [...document.querySelectorAll('.info-round')]
const contentHelp = [...document.querySelectorAll('.content-help')]
// Timeline
const interRound = [...document.querySelectorAll('.inter-round')]

const endScreen = document.querySelector('.quiz-end')

// Init
quizContainer[0].classList.add('active')

// Callback answer
socket.on('questionValue', _data => {
    console.log(_data)
    // define id
    if (_data.id == 1) {
        idSocket = _data.idSocket;
    }
    // question next
    if (idSocket == _data.idSocket && _data.id < 10) {
        quizContainer[_data.id - 1].classList.remove('active')
        quizContainer[_data.id - 1].classList.add('active-last')
        quizContainer[_data.id].classList.add('active')
        interRound[_data.id].classList.add('inter-round--active')
    } else {
        endScreen.classList.add('active')
    }
})

socket.on('showInformation', _data => {
    contentHelp[_data].classList.toggle('active')
})

// Click info
for (let i = 0; i < infoRound.length; i++) {
    infoRound[i].addEventListener('click', () => {
        console.log('ok')
        contentHelp[i].classList.toggle('active')
    })
}