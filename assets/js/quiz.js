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

const idPage = document.querySelector('.idpage').innerHTML
console.log(idPage)


const seekYes = [...document.querySelectorAll('.seek-data-yes')]
const seekNo = [...document.querySelectorAll('.seek-data-no')]

const textPourcentageYes = [... document.querySelectorAll('.pourcentageYes')]
const textPourcentageNo = [... document.querySelectorAll('.pourcentageNo')]

const textPourcentageHoveYes = [... document.querySelectorAll('.hover-tooltip-yes')]
const textPourcentageHoverNo = [... document.querySelectorAll('.hover-tooltip-no')]

const myVote = [...document.querySelectorAll('.my-vote-content-data')]

// Init
quizContainer[0].classList.add('active')

// Callback answer
socket.on('questionValue', _data => {
    console.log(_data)
    if(_data.data.idPage == idPage) {
        console.log(_data.data.id)
        // question next
        if (idSocket == _data.data.idSocket && _data.data.id < 10) {
            quizContainer[_data.data.id - 1].classList.remove('active')
            quizContainer[_data.data.id - 1].classList.add('active-last')
            quizContainer[_data.data.id].classList.add('active')
            interRound[_data.data.id].classList.add('inter-round--active')
        } else {
            // End screen
            setTimeout(() => {
                endScreen.classList.add('active')
                document.body.style.overflowY = "scroll"
                if(_data.newValue != undefined) {
                    answerStats = _data.newValue
                    console.log(answerStats)
                }
                allAnswers = _data.allAnswer
                answerQuestions = _data.questions
        
                for(let i = 0; i < allAnswers.length; i++) {
                    const pourcentageYes = answerStats[i].yesAnswer / answerStats[i].totalAnswer
                    const pourcentageNo = answerStats[i].noAnswer / answerStats[i].totalAnswer
                    const realPourcentageYes = `${Math.round(100 * pourcentageYes)}%`
                    const realPourcentageNo = `${Math.round(100 * pourcentageNo)}%`

                    seekYes[i].style.transform = `scaleX(${pourcentageYes})`
                    seekNo[i].style.transform = `scaleX(${pourcentageNo})`
        
                    allAnswers[i] == 1 ? myVote[i].innerHTML = answerQuestions[i].no : myVote[i].innerHTML = answerQuestions[i].yes
        
                    textPourcentageYes[i].innerHTML = realPourcentageYes
                    textPourcentageNo[i].innerHTML = realPourcentageNo
                    
                    textPourcentageHoveYes[i].innerHTML = realPourcentageYes
                    textPourcentageHoverNo[i].innerHTML = realPourcentageNo
                }
            }, 500)
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

