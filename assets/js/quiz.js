
const socket = io.connect('https://brexit-ornot.herokuapp.com');
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

const seekYesBtn = [...document.querySelectorAll('.yes-btnn')]
const seekNoBtn = [...document.querySelectorAll('.no-btnn')]

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

const advice = document.querySelector('.advice')

const myVote = [...document.querySelectorAll('.my-vote-content-data')]
const countryName = document.querySelector('.title-country').innerHTML;

const graphResult = document.querySelector('.bar-result')
// Init
quizContainer[0].classList.add('active')

// Callback answer
socket.on('questionValue', _data => {
    if(_data._data.idPage == idPage) {
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
            // End screen
                endTransition.classList.add('active')
                setTimeout(() => {
                    endScreen.classList.add('active')
                    globalContainer.classList.add('active')
                    document.body.style.overflowY = "scroll"
                    if(_data.newValue != undefined) {
                        answerStats = _data.newValue
                    }
                    allAnswers = _data.allAnswer
                    answerQuestions = _data.questions
                    let scoreAnswers = 0;
                    for(let y = 0; y < allAnswers.length; y++) {
                        scoreAnswers += parseInt(allAnswers[y+1])
                    } 
                    if(scoreAnswers >= 10 && scoreAnswers <= 12) {
                        advice.innerHTML = 'According to our study, the European Union and its way of being do not suit you. For the good of your country, you think it is better to leave it.'
                        graphResult.style.transform = 'scaleX(-1)'
                    } else if(scoreAnswers >= 13 && scoreAnswers <= 15) {
                        advice.innerHTML = ' According to our study, you are not totally in favor of leaving the European Union. Its current operation does not suit you, and you would like some things to vary.'
                        graphResult.style.transform = 'scaleX(-0.5)'
                    } else if(scoreAnswers >= 16 && scoreAnswers <= 18) {
                        advice.innerHTML = 'According to our study, you are not entirely convinced by the European Union, but you think the economic benefits it offers and good for you. The exit is not in your mind, but you would like to see some things changed.'
                        graphResult.style.transform = 'scaleX(0.5)'
                    } else {
                        advice.innerHTML = 'According to our study, you are totally charmed by the European Union and what it brings you on a daily basis from an economic point of view. You do not want to leave the European Union for your country.'
                        graphResult.style.transform = 'scaleX(1)'
                    }
                    for(let i = 0; i < allAnswers.length; i++) {
                        const pourcentageYes = answerStats[i].yesAnswer / answerStats[i].totalAnswer
                        const pourcentageNo = answerStats[i].noAnswer / answerStats[i].totalAnswer
                        const realPourcentageYes = `${Math.round(100 * pourcentageYes)}%`
                        const realPourcentageNo = `${Math.round(100 * pourcentageNo)}%`

                        
                        textPourcentageYes[i].innerHTML = realPourcentageYes
                        textPourcentageNo[i].innerHTML = realPourcentageNo
                        
                        textPourcentageHoveYes[i].innerHTML = realPourcentageYes
                        textPourcentageHoverNo[i].innerHTML = realPourcentageNo
                        
                        seekYesBtn[i].style.transform = `scaleX(${pourcentageYes})`
                        seekNoBtn[i].style.transform = `scaleX(${pourcentageNo})`
                    }
                }, 500)
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

