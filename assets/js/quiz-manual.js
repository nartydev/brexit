const yesManual = [...document.querySelectorAll('.yes-manual')]
const noManual = [...document.querySelectorAll('.no-manual')]

const seekYesManual = [...document.querySelectorAll('.seek-data-yesManual')]
const seekNoManual = [...document.querySelectorAll('.seek-data-noManual')]


const textPourcentageHoverYesManual = [...document.querySelectorAll('.hover-tooltip-yesManual')]
const textPourcentageHoverNoManual = [...document.querySelectorAll('.hover-tooltip-noManual')]

const textPourcentageYesManual = [... document.querySelectorAll('.pourcentageYesManual')]
const textPourcentageNoManual = [... document.querySelectorAll('.pourcentageNoManual')]

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
            containerStats[idQuestionManual - 1].classList.add('active')
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
    if (data._data.id <= 10) {
        console.log(data._data.id)
        answerStats = data.newValue
        answerQuestions = data.questions

        const pourcentageYes = answerStats[0].yesAnswer / answerStats[0].totalAnswer
        const pourcentageNo = answerStats[0].noAnswer / answerStats[0].totalAnswer
        const realPourcentageYes = `${Math.round(100 * pourcentageYes)}%`
        const realPourcentageNo = `${Math.round(100 * pourcentageNo)}%`

        seekYes[data._data.id - 1].style.transform = `scaleX(${pourcentageYes})`
        seekNo[data._data.id - 1].style.transform = `scaleX(${pourcentageNo})`
        
        textPourcentageYesManual[data._data.id -1].innerHTML = realPourcentageYes
        textPourcentageNoManual[data._data.id -1].innerHTML = realPourcentageNo

        textPourcentageHoverYesManual[data._data.id - 1].innerHTML = realPourcentageYes
        textPourcentageHoverNoManual[data._data.id - 1].innerHTML = realPourcentageNo
    }
    if (data._data.id == 10) {
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

for (let y = 0; y < skipButton.length; y++) {
    skipButton[y].addEventListener('click', _event => {
        _event.preventDefault()
        console.log(y);
        socket.emit('clickSkip', y)
    })
}

socket.on('skipStats', data => {
    console.log('data y', data);
    containerStats[data-1].classList.remove('active')
    quizContainer[data-1].classList.remove('active')
    quizContainer[data-1].classList.add('active-last')
    quizContainer[data].classList.add('active')
    interRound[data].classList.add('inter-round--active')
})
