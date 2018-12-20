const yesManual = [...document.querySelectorAll('.yes-manual')]
const noManual = [...document.querySelectorAll('.no-manual')]
function Sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function() {
    this.sound.play();
  }
  this.stop = function() {
    this.sound.pause();
  }
  this.loop = function() {
    this.sound.setAttribute("loop", "true");
  }
}
const answeredQuestion = new Sound('./assets/sound/answeredQuestion.mp3')
const buttonClick = new Sound('./assets/sound/buttonClick.mp3')
const finishQuiz = new Sound('./assets/sound/finishQuiz.mp3')
const soundBtn = document.querySelector('.sound-ico')
const soundOff = document.querySelector('.inner-sound-off')
const soundOn = document.querySelector('.inner-sound-on')
soundOnFunction()
function soundOnFunction(){
  answeredQuestion.sound.volume = 1
  buttonClick.sound.volume = 1
  finishQuiz.sound.volume = 1
}
function soundOffFunction(){
  answeredQuestion.sound.volume = 0
  buttonClick.sound.volume = 0
  finishQuiz.sound.volume = 0
}
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
        answeredQuestion.play()

    })
    noManual[i].addEventListener('click', () => {
        postElement(1)
        answeredQuestion.play()
    })
}

soundBtn.addEventListener('click', () => {
  soundOff.classList.toggle('sound-display')
  soundOff.classList.toggle('sound-no-display')
  soundOn.classList.toggle('sound-display')
  soundOn.classList.toggle('sound-no-display')
  if(soundOff.classList.contains('sound-display')){
    soundOffFunction()
  }
  if(soundOn.classList.contains('sound-display')){
    soundOnFunction()
  }
})

let globalAnswerb;


const skipButton = [...document.querySelectorAll('.skip-button')]

function postElement(idElement) {
    allAnswersManual[idQuestionManual] = idElement
    let dataManual = {
        "id": idQuestionManual,
        "value": allAnswersManual[idQuestionManual],
    }
    if (idQuestionManual <= 10) {
        if (idQuestionManual < 10) {
            containerStats[idQuestionManual - 1].classList.add('active')
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
        endTransition.classList.add('active')
        setTimeout(() => {
            endScreen.classList.add('active')
            globalContainer.classList.add('active')
            document.body.style.overflowY = "scroll"
            answerStats = data.newValue
            answerQuestions = data.questions
            let allAnswers = data._data.allAnswersManual
            let scoreAnswers = 0;
            for(let y = 0; y < 10; y++) {
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
        buttonClick.play()
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
