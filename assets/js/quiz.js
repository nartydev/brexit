
const socket = io.connect();
let idSocket
const containerStats = [...document.querySelectorAll('.container-question-result')]
const quizContainer = [...document.querySelectorAll('.container-question')]
const infoRound = [...document.querySelectorAll('.info-round')]
const contentHelp = [...document.querySelectorAll('.content-help')]
// Timeline
const interRound = [...document.querySelectorAll('.inter-round')]
// End screen
const endScreen = document.querySelector('.quiz-end')
const globalContainer = document.querySelector('.global-container')
let answerStats;
let allAnswers;
let answerQuestions;

const idPage = document.querySelector('.idpage').innerHTML
console.log(idPage)

const endTransition = document.querySelector('.end-transition')

const seekYes = [...document.querySelectorAll('.seek-data-yes')]
const seekNo = [...document.querySelectorAll('.seek-data-no')]

const textPourcentageYes = [... document.querySelectorAll('.pourcentageYes')]
const textPourcentageNo = [... document.querySelectorAll('.pourcentageNo')]

const textPourcentageHoveYes = [... document.querySelectorAll('.hover-tooltip-yes')]
const textPourcentageHoverNo = [... document.querySelectorAll('.hover-tooltip-no')]

const seekYesManual = [...document.querySelectorAll('.seek-data-yesManual')]
const seekNoManual = [...document.querySelectorAll('.seek-data-noManual')]

const textPourcentageHoverYesManual = [...document.querySelectorAll('.hover-tooltip-yesManual')]
const textPourcentageHoverNoManual = [...document.querySelectorAll('.hover-tooltip-noManual')]

const textPourcentageYesManual = [... document.querySelectorAll('.pourcentageYesManual')]
const textPourcentageNoManual = [... document.querySelectorAll('.pourcentageNoManual')]

const myVote = [...document.querySelectorAll('.my-vote-content-data')]
const countryName = document.querySelector('.title-country').innerHTML;
// Init
quizContainer[0].classList.add('active')

console.log(endScreen)
// Callback answer
socket.on('questionValue', _data => {
    console.log(_data)
    if(_data._data.idPage == idPage) {
        console.log(_data._data.id)
        // question next
        if (idSocket == _data._data.idSocket && _data._data.id < 10) {
            let answerStats = _data.newValue

            containerStats[_data._data.id - 1].classList.add('active')
            const pourcentageYes = answerStats[0].yesAnswer / answerStats[0].totalAnswer
            const pourcentageNo = answerStats[0].noAnswer / answerStats[0].totalAnswer
            const realPourcentageYes = `${Math.round(100 * pourcentageYes)}%`
            const realPourcentageNo = `${Math.round(100 * pourcentageNo)}%`

            seekYes[_data._data.id-1].style.transform = `scaleX(${pourcentageYes})`
            seekNo[_data._data.id-1].style.transform = `scaleX(${pourcentageNo})`
            
            textPourcentageYesManual[_data._data.id-1].innerHTML = realPourcentageYes
            textPourcentageNoManual[_data._data.id-1].innerHTML = realPourcentageNo

            textPourcentageHoverYesManual[_data._data.id-1].innerHTML = realPourcentageYes
            textPourcentageHoverNoManual[_data._data.id-1].innerHTML = realPourcentageNo
        } else {
            console.log('ok')
            // End screen
                endTransition.classList.add('active')
                endScreen.classList.add('active')
                globalContainer.classList.add('active')
                document.body.style.overflowY = "scroll"
                if(_data.newValue != undefined) {
                    answerStats = _data.newValue
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
                
                    textPourcentageYes[i].innerHTML = realPourcentageYes
                    textPourcentageNo[i].innerHTML = realPourcentageNo
                    
                    textPourcentageHoveYes[i].innerHTML = realPourcentageYes
                    textPourcentageHoverNo[i].innerHTML = realPourcentageNo
                }
        }
    }
})

socket.on('skipStatsPhone', _data => {
    containerStats[_data - 1].classList.remove('active')
    quizContainer[_data - 1].classList.remove('active')
    quizContainer[_data - 1].classList.add('active-last')
    quizContainer[_data].classList.add('active')
    interRound[_data].classList.add('inter-round--active')
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

