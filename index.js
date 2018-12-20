var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
const fs = require('fs');
const mongoose = require('mongoose');

let dataQuestions = fs.readFileSync('./assets/data/data-question.json');
let questions = JSON.parse(dataQuestions);

// Connect to db
mongoose.connect('mongodb://root:rootadmin123@ds157422.mlab.com:57422/brexit', { useNewUrlParser: true })
const db = mongoose.connection

db.on('error', () => console.log('error'))
db.once('open', () => {
    console.log('db connected')
})

const countryList = [
    {name: "France" },
    {name: "Germany" },
    {name: "Spain" },
    {name: "Italy" },
    {name: "UK" },
    {name: "Austia" },
    {name: "Poland" },
    {name: "Denmark" },
    {name: "Estonia" },
    {name: "Greece" },
    {name: "Ireland" },
    {name: "Croatia" },
    {name: "Netherlands" },
    {name: "Portugal" },
    {name: "Sweden" },
    {name: "Belgium" },
    {name: "Latvia" },
    {name: "Lithuania" },
    {name: "Czech" },
    {name: "Hungria" },
    {name: "Finland" },
    {name: "Bulgaria" },
    {name: "Roumania" },
]

// Schema Questions

const answerSchema = mongoose.Schema({
    idSocket: String,
    country: String,
    question_1: Number,
    question_2: Number,
    question_3: Number,
    question_4: Number,
    question_5: Number,
    question_6: Number,
    question_7: Number,
    question_8: Number,
    question_9: Number,
    question_10: Number
})

const Answer = mongoose.model('Answer', answerSchema)

let allAnswer = []
let dataSectionQuestions = [];
let newValueManual = [];
let totalAnswer;
let countryName;

//Middleware

app.use('/assets', express.static('assets'))
app.use( (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.set('views', './views')
app.set('view engine', 'ejs')

let idLinkPage = 0
idLinkPage = Math.floor((Math.random() * 10000));
let lastid = 0


// Set route
app.get('/', (req, res) => {
    console.log(idLinkPage)
    res.render('index', { idLinkPage })
    lastid = idLinkPage;
    idLinkPage = Math.floor((Math.random() * 10000));
});

app.get('/test', (req, res) => {
    res.render('test')
});

app.get('/:country/result', (req, res) => {
    const countryName = req.params.country
    let allDataCountry = [];
    Answer.countDocuments({ country: countryName }, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            totalAnswer = result;
            Answer.countDocuments({ country: countryName, question_10: 2 }, (err, result) => {
                if (err) {
                    console.log(err)
                } else {
                    const newStats = {
                        idQuestion: 10,
                        totalAnswer: totalAnswer,
                        yesAnswer: result,
                        noAnswer: totalAnswer - result
                    }
                    allDataCountry = [newStats, ...allDataCountry]
                }
            })
            Answer.countDocuments({ country: countryName, question_9: 2 }, (err, result) => {
                if (err) {
                    console.log(err)
                } else {
                    const newStats = {
                        idQuestion: 9,
                        totalAnswer: totalAnswer,
                        yesAnswer: result,
                        noAnswer: totalAnswer - result
                    }
                    allDataCountry = [newStats, ...allDataCountry]
                }
            })
            Answer.countDocuments({ country: countryName, question_8: 2 }, (err, result) => {
                if (err) {
                    console.log(err)
                } else {
                    const newStats = {
                        idQuestion: 8,
                        totalAnswer: totalAnswer,
                        yesAnswer: result,
                        noAnswer: totalAnswer - result
                    }
                    allDataCountry = [newStats, ...allDataCountry]
                }
            })
            Answer.countDocuments({ country: countryName, question_7: 2 }, (err, result) => {
                if (err) {
                    console.log(err)
                } else {
                    const newStats = {
                        idQuestion: 7,
                        totalAnswer: totalAnswer,
                        yesAnswer: result,
                        noAnswer: totalAnswer - result
                    }
                    allDataCountry = [newStats, ...allDataCountry]
                }
            })
            Answer.countDocuments({ country: countryName, question_6: 2 }, (err, result) => {
                if (err) {
                    console.log(err)
                } else {
                    const newStats = {
                        idQuestion: 6,
                        totalAnswer: totalAnswer,
                        yesAnswer: result,
                        noAnswer: totalAnswer - result
                    }
                    allDataCountry = [newStats, ...allDataCountry]
                }
            })
            Answer.countDocuments({ country: countryName, question_5: 2 }, (err, result) => {
                if (err) {
                    console.log(err)
                } else {
                    const newStats = {
                        idQuestion: 5,
                        totalAnswer: totalAnswer,
                        yesAnswer: result,
                        noAnswer: totalAnswer - result
                    }
                    allDataCountry = [newStats, ...allDataCountry]
                }
            })
            Answer.countDocuments({ country: countryName, question_4: 2 }, (err, result) => {
                if (err) {
                    console.log(err)
                } else {
                    const newStats = {
                        idQuestion: 4,
                        totalAnswer: totalAnswer,
                        yesAnswer: result,
                        noAnswer: totalAnswer - result
                    }
                    allDataCountry = [newStats, ...allDataCountry]
                }
            })
            Answer.countDocuments({ country: countryName, question_3: 2 }, (err, result) => {
                if (err) {
                    console.log(err)
                } else {
                    const newStats = {
                        idQuestion: 3,
                        totalAnswer: totalAnswer,
                        yesAnswer: result,
                        noAnswer: totalAnswer - result
                    }
                    allDataCountry = [newStats, ...allDataCountry]
                }
            })
            Answer.countDocuments({ country: countryName, question_2: 2 }, (err, result) => {
                if (err) {
                    console.log(err)
                } else {
                    const newStats = {
                        idQuestion: 2,
                        totalAnswer: totalAnswer,
                        yesAnswer: result,
                        noAnswer: totalAnswer - result
                    }
                    allDataCountry = [newStats, ...allDataCountry]
                }
            })
            Answer.countDocuments({ country: countryName, question_1: 2 }, (err, result) => {
                if (err) {
                    console.log(err)
                } else {
                    const newStats = {
                        idQuestion: 1,
                        totalAnswer: totalAnswer,
                        yesAnswer: result,
                        noAnswer: totalAnswer - result
                    }
                    allDataCountry = [newStats, ...allDataCountry]
                    console.log(allDataCountry)
                    res.render('country-result', {datas: questions, allDataCountry, countryList, countryName: countryName} )
                }
            })
        }
    })
});

app.get('/quiz-phone/:id', (req, res) => {
    const idPage = req.params.id
    res.render('quiz-phone', { idPage })
});

app.get('/require-id', (req, res) => {
    res.redirect(`/quiz-phone/${lastid}`)
    console.log(lastid)
})

app.get('/country/:country', (req, res) => {
    countryName = req.params.country
    res.render('quiz', { countryName: countryName, countryList, datas: questions, idPage: 0, manualQuestion: true })
});

app.get('/country/:country/:id', (req, res) => {
    countryName = req.params.country
    const idPage = req.params.id
    res.render('quiz', { countryName: countryName, countryList, datas: questions, idPage, manualQuestion: false })
});

// Listen connect
io.on('connection', (socket, data) => {
    allAnswer = []
    socket.on('answerQuestion', (_data) => {
        idStatsVizu = _data.id-1
        if (allAnswer.length <= 10 && _data.value) {
            allAnswer = [...allAnswer, _data.value]
        }
        // Send data with specify property
        if (idStatsVizu == 0) {
            Answer.countDocuments({ country: countryName }, (err, result) => {
                if (err) {
                    console.log(err)
                } else {
                    totalAnswer = result;
                    Answer.countDocuments({ country: countryName, question_1: 2 }, (err, result) => {
                        if (err) {
                            console.log(err)
                        } else {
                            const newStats = {
                                idQuestion: 1,
                                totalAnswer: totalAnswer,
                                yesAnswer: result,
                                noAnswer: totalAnswer - result
                            }
                            const newValue = [newStats, ...dataSectionQuestions]
                            newValueManual = [newStats, ...newValueManual]
                            console.log(newValueManual)
                            io.sockets.emit('questionValue', { _data, newValue, allAnswer, questions })
                        }
                    })
                }
            })
        } else if (idStatsVizu == 1) {
            Answer.countDocuments({ country: countryName }, (err, result) => {
                if (err) {
                    console.log(err)
                } else {
                    totalAnswer = result;
                    Answer.countDocuments({ country: countryName, question_2: 2 }, (err, result) => {
                        if (err) {
                            console.log(err)
                        } else {
                            const newStats = {
                                idQuestion: 2,
                                totalAnswer: totalAnswer,
                                yesAnswer: result,
                                noAnswer: totalAnswer - result
                            }
                            const newValue = [newStats, ...dataSectionQuestions]
                            newValueManual = [newStats, ...newValueManual]
                            console.log(newValueManual)
                            io.sockets.emit('questionValue', { _data, newValue, allAnswer, questions })
                        }
                    })
                }
            })
        } else if (idStatsVizu == 2) {
            Answer.countDocuments({ country: countryName }, (err, result) => {
                if (err) {
                    console.log(err)
                } else {
                    totalAnswer = result;
                    Answer.countDocuments({ country: countryName, question_3: 2 }, (err, result) => {
                        if (err) {
                            console.log(err)
                        } else {
                            const newStats = {
                                idQuestion: 3,
                                totalAnswer: totalAnswer,
                                yesAnswer: result,
                                noAnswer: totalAnswer - result
                            }
                            const newValue = [newStats, ...dataSectionQuestions]
                            newValueManual = [newStats, ...newValueManual]
                            console.log(newValueManual)
                            io.sockets.emit('questionValue', { _data, newValue, allAnswer, questions })
                        }
                    })
                }
            })
        } else if (idStatsVizu == 3) {
            Answer.countDocuments({ country: countryName }, (err, result) => {
                if (err) {
                    console.log(err)
                } else {
                    totalAnswer = result;
                    Answer.countDocuments({ country: countryName, question_4: 2 }, (err, result) => {
                        if (err) {
                            console.log(err)
                        } else {
                            const newStats = {
                                idQuestion: 4,
                                totalAnswer: totalAnswer,
                                yesAnswer: result,
                                noAnswer: totalAnswer - result
                            }
                            const newValue = [newStats, ...dataSectionQuestions]
                            newValueManual = [newStats, ...newValueManual]
                            console.log(newValueManual)
                            io.sockets.emit('questionValue', { _data, newValue, allAnswer, questions })
                        }
                    })
                }
            })
        } else if (idStatsVizu == 4) {
            Answer.countDocuments({ country: countryName }, (err, result) => {
                if (err) {
                    console.log(err)
                } else {
                    totalAnswer = result;
                    Answer.countDocuments({ country: countryName, question_5: 2 }, (err, result) => {
                        if (err) {
                            console.log(err)
                        } else {
                            const newStats = {
                                idQuestion: 5,
                                totalAnswer: totalAnswer,
                                yesAnswer: result,
                                noAnswer: totalAnswer - result
                            }
                            const newValue = [newStats, ...dataSectionQuestions]
                            newValueManual = [newStats, ...newValueManual]
                            console.log(newValueManual)
                            io.sockets.emit('questionValue', { _data, newValue, allAnswer, questions })
                        }
                    })
                }
            })
        } else if (idStatsVizu == 5) {
            Answer.countDocuments({ country: countryName }, (err, result) => {
                if (err) {
                    console.log(err)
                } else {
                    totalAnswer = result;
                    Answer.countDocuments({ country: countryName, question_6: 2 }, (err, result) => {
                        if (err) {
                            console.log(err)
                        } else {
                            const newStats = {
                                idQuestion: 6,
                                totalAnswer: totalAnswer,
                                yesAnswer: result,
                                noAnswer: totalAnswer - result
                            }
                            const newValue = [newStats, ...dataSectionQuestions]
                            newValueManual = [newStats, ...newValueManual]
                            console.log(newValueManual)
                            io.sockets.emit('questionValue', { _data, newValue, allAnswer, questions })
                        }
                    })
                }
            })
        } else if (idStatsVizu == 6) {
            Answer.countDocuments({ country: countryName }, (err, result) => {
                if (err) {
                    console.log(err)
                } else {
                    totalAnswer = result;
                    Answer.countDocuments({ country: countryName, question_7: 2 }, (err, result) => {
                        if (err) {
                            console.log(err)
                        } else {
                            const newStats = {
                                idQuestion: 7,
                                totalAnswer: totalAnswer,
                                yesAnswer: result,
                                noAnswer: totalAnswer - result
                            }
                            const newValue = [newStats, ...dataSectionQuestions]
                            newValueManual = [newStats, ...newValueManual]
                            console.log(newValueManual)
                            io.sockets.emit('questionValue', { _data, newValue, allAnswer, questions })
                        }
                    })
                }
            })
        } else if (idStatsVizu == 7) {
            Answer.countDocuments({ country: countryName }, (err, result) => {
                if (err) {
                    console.log(err)
                } else {
                    totalAnswer = result;
                    Answer.countDocuments({ country: countryName, question_8: 2 }, (err, result) => {
                        if (err) {
                            console.log(err)
                        } else {
                            const newStats = {
                                idQuestion: 8,
                                totalAnswer: totalAnswer,
                                yesAnswer: result,
                                noAnswer: totalAnswer - result
                            }
                            const newValue = [newStats, ...dataSectionQuestions]
                            newValueManual = [newStats, ...newValueManual]
                            console.log(newValueManual)
                            io.sockets.emit('questionValue', { _data, newValue, allAnswer, questions })
                        }
                    })
                }
            })
        } else if (idStatsVizu == 8) {
            Answer.countDocuments({ country: countryName }, (err, result) => {
                if (err) {
                    console.log(err)
                } else {
                    totalAnswer = result;
                    Answer.countDocuments({ country: countryName, question_9: 2 }, (err, result) => {
                        if (err) {
                            console.log(err)
                        } else {
                            const newStats = {
                                idQuestion: 9,
                                totalAnswer: totalAnswer,
                                yesAnswer: result,
                                noAnswer: totalAnswer - result
                            }
                            const newValue = [newStats, ...dataSectionQuestions]
                            newValueManual = [newStats, ...newValueManual]
                            console.log(newValueManual)
                            io.sockets.emit('questionValue', { _data, newValue, allAnswer, questions })
                        }
                    })
                }
            })
        } else if (idStatsVizu == 9) {
            console.log(allAnswer)
            Answer.countDocuments({ country: countryName }, (err, result) => {
                if (err) {
                    console.log(err)
                } else {
                    totalAnswer = result;
                    Answer.countDocuments({ country: countryName, question_10: 2 }, (err, result) => {
                        if (err) {
                            console.log(err)
                        } else {
                            const newStats = {
                                idQuestion: 10,
                                totalAnswer: totalAnswer,
                                yesAnswer: result,
                                noAnswer: totalAnswer - result
                            }
                            const newValue = [newStats, ...newValueManual]
                            const finalAnswerPhone = new Answer({
                                country: countryName,
                                question_1: allAnswer[0],
                                question_2: allAnswer[1],
                                question_3: allAnswer[2],
                                question_4: allAnswer[3],
                                question_5: allAnswer[4],
                                question_6: allAnswer[5],
                                question_7: allAnswer[6],
                                question_8: allAnswer[7],
                                question_9: allAnswer[8],
                                question_10: allAnswer[9]
                            })
                            
                            finalAnswerPhone.save((err, result) => {
                                if (err) {
                                    console.log(err)
                                } else {
                                    io.sockets.emit('questionValue', { _data, newValue, allAnswer, questions })
                                }
                            })       
                        }
                    })
                }
            })
        } else {
            console.log('ok')
        } 
    })

    socket.on('clickManual', _data => {
        console.log(_data)
        idStatsVizu = _data.id-1
        if (idStatsVizu == 0) {
            Answer.countDocuments({ country: countryName }, (err, result) => {
                if (err) {
                    console.log(err)
                } else {
                    totalAnswer = result;
                    Answer.countDocuments({ country: countryName, question_1: 2 }, (err, result) => {
                        if (err) {
                            console.log(err)
                        } else {
                            const newStats = {
                                idQuestion: 1,
                                totalAnswer: totalAnswer,
                                yesAnswer: result,
                                noAnswer: totalAnswer - result
                            }
                            const newValue = [newStats, ...dataSectionQuestions]
                            newValueManual = [newStats, ...newValueManual]
                            console.log(newValueManual)
                            io.sockets.emit('showEnd', { _data, newValue, questions })
                        }
                    })
                }
            })
        } else if (idStatsVizu == 1) {
            Answer.countDocuments({ country: countryName }, (err, result) => {
                if (err) {
                    console.log(err)
                } else {
                    totalAnswer = result;
                    Answer.countDocuments({ country: countryName, question_2: 2 }, (err, result) => {
                        if (err) {
                            console.log(err)
                        } else {
                            const newStats = {
                                idQuestion: 2,
                                totalAnswer: totalAnswer,
                                yesAnswer: result,
                                noAnswer: totalAnswer - result
                            }
                            const newValue = [newStats, ...dataSectionQuestions]
                            newValueManual = [newStats, ...newValueManual]
                            console.log(newValueManual)
                            io.sockets.emit('showEnd', { _data, newValue, questions })
                        }
                    })
                }
            })
        } else if (idStatsVizu == 2) {
            Answer.countDocuments({ country: countryName }, (err, result) => {
                if (err) {
                    console.log(err)
                } else {
                    totalAnswer = result;
                    Answer.countDocuments({ country: countryName, question_3: 2 }, (err, result) => {
                        if (err) {
                            console.log(err)
                        } else {
                            const newStats = {
                                idQuestion: 3,
                                totalAnswer: totalAnswer,
                                yesAnswer: result,
                                noAnswer: totalAnswer - result
                            }
                            const newValue = [newStats, ...dataSectionQuestions]
                            newValueManual = [newStats, ...newValueManual]
                            console.log(newValueManual)
                            io.sockets.emit('showEnd', { _data, newValue, questions })
                        }
                    })
                }
            })
        } else if (idStatsVizu == 3) {
            Answer.countDocuments({ country: countryName }, (err, result) => {
                if (err) {
                    console.log(err)
                } else {
                    totalAnswer = result;
                    Answer.countDocuments({ country: countryName, question_4: 2 }, (err, result) => {
                        if (err) {
                            console.log(err)
                        } else {
                            const newStats = {
                                idQuestion: 4,
                                totalAnswer: totalAnswer,
                                yesAnswer: result,
                                noAnswer: totalAnswer - result
                            }
                            const newValue = [newStats, ...dataSectionQuestions]
                            newValueManual = [newStats, ...newValueManual]
                            console.log(newValueManual)
                            io.sockets.emit('showEnd', { _data, newValue, questions })
                        }
                    })
                }
            })
        } else if (idStatsVizu == 4) {
            Answer.countDocuments({ country: countryName }, (err, result) => {
                if (err) {
                    console.log(err)
                } else {
                    totalAnswer = result;
                    Answer.countDocuments({ country: countryName, question_5: 2 }, (err, result) => {
                        if (err) {
                            console.log(err)
                        } else {
                            const newStats = {
                                idQuestion: 5,
                                totalAnswer: totalAnswer,
                                yesAnswer: result,
                                noAnswer: totalAnswer - result
                            }
                            const newValue = [newStats, ...dataSectionQuestions]
                            newValueManual = [newStats, ...newValueManual]
                            console.log(newValueManual)
                            io.sockets.emit('showEnd', { _data, newValue, questions })
                        }
                    })
                }
            })
        } else if (idStatsVizu == 5) {
            Answer.countDocuments({ country: countryName }, (err, result) => {
                if (err) {
                    console.log(err)
                } else {
                    totalAnswer = result;
                    Answer.countDocuments({ country: countryName, question_6: 2 }, (err, result) => {
                        if (err) {
                            console.log(err)
                        } else {
                            const newStats = {
                                idQuestion: 6,
                                totalAnswer: totalAnswer,
                                yesAnswer: result,
                                noAnswer: totalAnswer - result
                            }
                            const newValue = [newStats, ...dataSectionQuestions]
                            newValueManual = [newStats, ...newValueManual]
                            console.log(newValueManual)
                            io.sockets.emit('showEnd', { _data, newValue, questions })
                        }
                    })
                }
            })
        } else if (idStatsVizu == 6) {
            Answer.countDocuments({ country: countryName }, (err, result) => {
                if (err) {
                    console.log(err)
                } else {
                    totalAnswer = result;
                    Answer.countDocuments({ country: countryName, question_7: 2 }, (err, result) => {
                        if (err) {
                            console.log(err)
                        } else {
                            const newStats = {
                                idQuestion: 7,
                                totalAnswer: totalAnswer,
                                yesAnswer: result,
                                noAnswer: totalAnswer - result
                            }
                            const newValue = [newStats, ...dataSectionQuestions]
                            newValueManual = [newStats, ...newValueManual]
                            console.log(newValueManual)
                            io.sockets.emit('showEnd', { _data, newValue, questions })
                        }
                    })
                }
            })
        } else if (idStatsVizu == 7) {
            Answer.countDocuments({ country: countryName }, (err, result) => {
                if (err) {
                    console.log(err)
                } else {
                    totalAnswer = result;
                    Answer.countDocuments({ country: countryName, question_8: 2 }, (err, result) => {
                        if (err) {
                            console.log(err)
                        } else {
                            const newStats = {
                                idQuestion: 8,
                                totalAnswer: totalAnswer,
                                yesAnswer: result,
                                noAnswer: totalAnswer - result
                            }
                            const newValue = [newStats, ...dataSectionQuestions]
                            newValueManual = [newStats, ...newValueManual]
                            console.log(newValueManual)
                            io.sockets.emit('showEnd', { _data, newValue, questions })
                        }
                    })
                }
            })
        } else if (idStatsVizu == 8) {
            Answer.countDocuments({ country: countryName }, (err, result) => {
                if (err) {
                    console.log(err)
                } else {
                    totalAnswer = result;
                    Answer.countDocuments({ country: countryName, question_9: 2 }, (err, result) => {
                        if (err) {
                            console.log(err)
                        } else {
                            const newStats = {
                                idQuestion: 9,
                                totalAnswer: totalAnswer,
                                yesAnswer: result,
                                noAnswer: totalAnswer - result
                            }
                            const newValue = [newStats, ...dataSectionQuestions]
                            newValueManual = [newStats, ...newValueManual]
                            console.log(newValueManual)
                            io.sockets.emit('showEnd', { _data, newValue, questions })
                        }
                    })
                }
            })
        } else if (idStatsVizu == 9) {
            Answer.countDocuments({ country: countryName }, (err, result) => {
                if (err) {
                    console.log(err)
                } else {
                    totalAnswer = result;
                    Answer.countDocuments({ country: countryName, question_10: 2 }, (err, result) => {
                        if (err) {
                            console.log(err)
                        } else {
                            const newStats = {
                                idQuestion: 10,
                                totalAnswer: totalAnswer,
                                yesAnswer: result,
                                noAnswer: totalAnswer - result
                            }
                            const newValue = [newStats, ...newValueManual]
                            console.log(newValueManual)
                            const finalAnswer = new Answer({
                                country: countryName,
                                question_1: _data.allAnswersManual[0],
                                question_2: _data.allAnswersManual[1],
                                question_3: _data.allAnswersManual[2],
                                question_4: _data.allAnswersManual[3],
                                question_5: _data.allAnswersManual[4],
                                question_6: _data.allAnswersManual[5],
                                question_7: _data.allAnswersManual[6],
                                question_8: _data.allAnswersManual[7],
                                question_9: _data.allAnswersManual[8],
                                question_10: _data.allAnswersManual[9]
                            })
                            
                            finalAnswer.save((err, result) => {
                                if (err) {
                                    console.log(err)
                                } else {
                                    console.log('success', result)
                                    io.sockets.emit('showEnd', { _data, newValue, questions })
                                }
                            })
                        }
                    })
                }
            })
            console.log('finishhh')
        } 
        // Yes = 2
        // No = 1
    })

    socket.on('clickSkip', _id => {
        console.log(_id)
        io.sockets.emit('skipStats', _id + 1)
    })

    socket.on('clickSkipPhone', _id => {
        io.sockets.emit('skipStatsPhone', _id - 1)
    })

    socket.on('clickInformation', _id => {
        io.sockets.emit('showInformation', _id - 1)
    })
    socket.on('disconnect', () => {
        console.log('user disconnected')
    });
});

http.listen(3000 || 5000, function () {
    console.log('listening on *' + process.env.PORT)
});




