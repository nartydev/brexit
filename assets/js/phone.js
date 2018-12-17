const socket = io.connect();
const infoRound = document.querySelector('.info-round')
const quizBox = [...document.querySelectorAll('.box-quiz')]
const endPhone = document.querySelector('.end-phone')
let idQuestion = 1
let idSocket

const numberQ = document.querySelector('.number-q')

numberQ.innerHTML = idQuestion

for (let quiz of quizBox) {
    quiz.addEventListener('click', _event => {
        _event.preventDefault()
        const value = quiz.querySelector('input').value
        let data = {
            "id": idQuestion,
            "value": value
        }
        socket.emit('answerQuestion', data)
        quiz.querySelector('input').checked = false

    })
}

infoRound.addEventListener('click', _event => {
    _event.preventDefault()
    socket.emit('clickInformation', idQuestion)
})

socket.on('questionValue', _data => {
    console.log('ok')
    if (idQuestion < 10 && idSocket == _data.idSocket) {
        idQuestion++
        numberQ.innerHTML = _data.id + 1
    } else {
        endPhone.classList.add('active')
    }
})

socket.on('auth', _socketId => {
    let value = {
        "id": 0,
        "id_socket": _socketId,
        "id_confirm": true
    }
    socket.emit('connect', value)
})