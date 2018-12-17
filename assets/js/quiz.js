const socket = io.connect();
let idSocket

const quizContainer = [...document.querySelectorAll('.container-question')]
const infoRound = [...document.querySelectorAll('.info-round')]
const contentHelp = [...document.querySelectorAll('.content-help')]
// Timeline
const interRound = [...document.querySelectorAll('.inter-round')]
// End screen
const endScreen = document.querySelector('.quiz-end')
let answerStats;
let allAnswers;
let answerQuestions;

const seekYes = [...document.querySelectorAll('.seek-data-yes')]
const seekNo = [...document.querySelectorAll('.seek-data-no')]

const myVote = [...document.querySelectorAll('.my-vote-content-data')]

// Init
quizContainer[0].classList.add('active')

// Callback answer
socket.on('questionValue', (_data, _allAnswers, _answerQuestions) => {
    console.log(_data)
    // question next
    if (idSocket == _data.idSocket && _data.id < 10) {
        quizContainer[_data.id - 1].classList.remove('active')
        quizContainer[_data.id - 1].classList.add('active-last')
        quizContainer[_data.id].classList.add('active')
        interRound[_data.id].classList.add('inter-round--active')
    } else {
        // End screen
        endScreen.classList.add('active')
        document.body.style.overflowY = "scroll"
        
        answerStats = _data
        allAnswers = _allAnswers
        answerQuestions = _answerQuestions

        for(let i = 0; i < answerStats.length-1; i++) {
            const pourcentageYes = answerStats[i].yesAnswer / answerStats[i].totalAnswer
            seekYes[i].style.transform = `scaleX(${pourcentageYes})`
            const pourcentageNo = answerStats[i].noAnswer / answerStats[i].totalAnswer
            seekNo[i].style.transform = `scaleX(${pourcentageNo})`
            if(allAnswers[i] == 1) {
                myVote[i].innerHTML = answerQuestions[i].no
            } else {
                myVote[i].innerHTML = answerQuestions[i].yes
            }
        }
    }
})

socket.on('showInformation', _data => {
    contentHelp[_data].classList.toggle('active')
})

// Click info
for (let i = 0; i < infoRound.length; i++) {
    infoRound[i].addEventListener('click', () => {
        contentHelp[i].classList.toggle('active')
    })
}

