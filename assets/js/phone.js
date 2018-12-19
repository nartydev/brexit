const socket = io.connect();
const infoRound = document.querySelector('.info-round')
const quizBox = [...document.querySelectorAll('.box-quiz')]
const endPhone = document.querySelector('.end-phone')
const answer = document.querySelectorAll('.word-quiz')
console.log(answer)
let idQuestion = 1
let idSocket

const skipButton = document.querySelector('.stats-skip-screen')

const idPage = document.querySelector('.idpage').innerHTML
console.log(idPage)

const numberQ = document.querySelector('.number-q')

numberQ.innerHTML = idQuestion

for (let quiz of quizBox) {
    quiz.addEventListener('click', _event => {
        _event.preventDefault()
        const value = quiz.querySelector('input').value
        let data = {
            "id": idQuestion,
            "value": value,
            "idPage": idPage
        }
        socket.emit('answerQuestion', data)
        quiz.querySelector('input').checked = false
    })
}

skipButton.addEventListener('click', _event => {
    _event.preventDefault()
    socket.emit('clickSkipPhone', idQuestion)
})

infoRound.addEventListener('click', _event => {
    _event.preventDefault()
    socket.emit('clickInformation', idQuestion)
})

socket.on('questionValue', _data => {
    //console.log(_data.questions[idQuestion].yes,_data.questions[idQuestion].no)
    console.log(_data)
    if (idQuestion < 10 && idSocket == _data.idSocket) {
        idQuestion++
        skipButton.classList.add('active')
        answer[0].innerHTML = _data.questions[idQuestion - 1].yes
        answer[1].innerHTML = _data.questions[idQuestion - 1].no
        console.log('k')
    } else {
        console.log('no')
        idQuestion++
        endPhone.classList.add('active')
    }
})

socket.on('skipStatsPhone', _data => {
    skipButton.classList.remove('active')
    numberQ.innerHTML = _data + 1
})
