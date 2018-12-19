const yesManual = [...document.querySelectorAll('.yes-manual')]
const noManual = [...document.querySelectorAll('.no-manual')]

let allAnswersManual = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0,
    10: 0,
}
let idQuestionManual = 1

for (let i = 0; i < yesManual.length; i++) {
    yesManual[i].addEventListener('click', () => {
        postElement(2)

    })
    noManual[i].addEventListener('click', () => {
        postElement(1)
    })
}

console.log(countryName)

let globalAnswerb;

const containerStats = [...document.querySelectorAll('.container-question-result')]
const skipButton = [...document.querySelectorAll('.skip-button')]

function postElement(idElement) {
    allAnswersManual[idQuestionManual] = idElement
    let dataManual = {
        "id": idQuestionManual,
        "value": allAnswersManual[idQuestionManual],
    }
    if (idQuestionManual <= 10) {
        if (idQuestionManual < 10) {

            // Show stats
            containerStats[idQuestionManual-1].classList.add('active')
            //

        }
        idQuestionManual++
    }
    if (idQuestionManual == 11) {
        dataManual.allAnswersManual = allAnswersManual
    }
    socket.emit('clickManual', (dataManual))
}

socket.on('showEnd', data => {
    console.log(data)
    if(data._data.id == 10) {
        setTimeout(() => {
            endScreen.classList.add('active')
            document.body.style.overflowY = "scroll"
            answerStats = data.newValue
            answerQuestions = data.questions
        
            for (let i = 0; i < 10; i++) {
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
        }, 1000)
    }
})

for(let y = 0; y < skipButton.length; y++) {
    skipButton[y].addEventListener('click', _event => {
        _event.preventDefault()
        console.log(y);
        socket.emit('clickSkip', y)
    })
}

socket.on('skipStats', data => {
    console.log('data y', data);
    containerStats[data+1].classList.remove('active')
    quizContainer[data+1].classList.remove('active')
    quizContainer[data+1].classList.add('active-last')
    quizContainer[data+2].classList.add('active')
    interRound[data+2].classList.add('inter-round--active')
})

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        console.log('cool')
    }
}