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

function postElement(idElement) {
    allAnswersManual[idQuestionManual] = idElement
    let dataManual = {
        "id": idQuestionManual,
        "value": allAnswersManual[idQuestionManual],
    }
    if (idQuestionManual <= 10) {
        console.log(allAnswersManual)
        if (idQuestionManual < 10) {
            quizContainer[idQuestionManual - 1].classList.remove('active')
            quizContainer[idQuestionManual - 1].classList.add('active-last')
            quizContainer[idQuestionManual].classList.add('active')
            interRound[idQuestionManual].classList.add('inter-round--active')
        }
        idQuestionManual++
        console.log(dataManual)
    }
    if (idQuestionManual == 11) {
        dataManual.allAnswersManual = allAnswersManual
    }
    socket.emit('clickManual', (dataManual))
}

socket.on('showEnd', data => {
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

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        console.log('cool')
    }
}