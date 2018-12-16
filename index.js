var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
const mongoose = require('mongoose');

// Connect to db
mongoose.connect('mongodb://root:rootadmin123@ds157422.mlab.com:57422/brexit', { useNewUrlParser: true })
const db = mongoose.connection

db.on('error', () => console.log('error'))
db.once('open', () => {
    console.log('db connected')
})

// Data 

const questions = {
    0: {
        question: 'Êtes-vous prêt à déménager dans un autre pays d’Europe pour garder votre emploi ?',
        help: 'Eius populus ab incunabulis primis ad usque pueritiae tempus extremum, quod annis circumcluditur fere trecentis, circummurana pertulit bella, deinde aetatem ingressus adultam post multiplices bellorum aerumnas Alpes transcendit et fretum, in iuvenem erectus et virum ex omni plaga quam orbis ambit inmensus, reportavit laureas et triumphos, iamque vergens in senium et nomine solo aliquotiens vincens ad tranquilliora vitae discessit.'
    },
    1: {
        question: 'Préférez-vous aider à financer la construction d’une école dans votre quartier qu’apporter de l’aide à l’Espagne en crise ?',
        help: 'Eius populus ab incunabulis primis ad usque pueritiae tempus extremum, quod annis circumcluditur fere trecentis, circummurana pertulit bella, deinde aetatem ingressus adultam post multiplices bellorum aerumnas Alpes transcendit et fretum, in iuvenem erectus et virum ex omni plaga quam orbis ambit inmensus, reportavit laureas et triumphos, iamque vergens in senium et nomine solo aliquotiens vincens ad tranquilliora vitae discessit.'

    },
    2: {
        question: 'Voudriez-vous payer plus cher vos vacances en France ou en Espagne ?',
        help: 'Eius populus ab incunabulis primis ad usque pueritiae tempus extremum, quod annis circumcluditur fere trecentis, circummurana pertulit bella, deinde aetatem ingressus adultam post multiplices bellorum aerumnas Alpes transcendit et fretum, in iuvenem erectus et virum ex omni plaga quam orbis ambit inmensus, reportavit laureas et triumphos, iamque vergens in senium et nomine solo aliquotiens vincens ad tranquilliora vitae discessit.'
    },
    3: {
        question: 'Souhaitez-vous voir moins d’immigrés dans votre pays ?',
        help: 'Eius populus ab incunabulis primis ad usque pueritiae tempus extremum, quod annis circumcluditur fere trecentis, circummurana pertulit bella, deinde aetatem ingressus adultam post multiplices bellorum aerumnas Alpes transcendit et fretum, in iuvenem erectus et virum ex omni plaga quam orbis ambit inmensus, reportavit laureas et triumphos, iamque vergens in senium et nomine solo aliquotiens vincens ad tranquilliora vitae discessit.'

    },
    4: {
        question: 'VRCDXS',
        help: 'Eius populus ab incunabulis primis ad usque pueritiae tempus extremum, quod annis circumcluditur fere trecentis, circummurana pertulit bella, deinde aetatem ingressus adultam post multiplices bellorum aerumnas Alpes transcendit et fretum, in iuvenem erectus et virum ex omni plaga quam orbis ambit inmensus, reportavit laureas et triumphos, iamque vergens in senium et nomine solo aliquotiens vincens ad tranquilliora vitae discessit.'

    },
    5: {
        question: 'BlaVFCDSXWblab',
        help: 'Eius populus ab incunabulis primis ad usque pueritiae tempus extremum, quod annis circumcluditur fere trecentis, circummurana pertulit bella, deinde aetatem ingressus adultam post multiplices bellorum aerumnas Alpes transcendit et fretum, in iuvenem erectus et virum ex omni plaga quam orbis ambit inmensus, reportavit laureas et triumphos, iamque vergens in senium et nomine solo aliquotiens vincens ad tranquilliora vitae discessit.'

    },
    6: {
        question: 'BlVRFCDSXQWablab',
        help: 'Eius populus ab incunabulis primis ad usque pueritiae tempus extremum, quod annis circumcluditur fere trecentis, circummurana pertulit bella, deinde aetatem ingressus adultam post multiplices bellorum aerumnas Alpes transcendit et fretum, in iuvenem erectus et virum ex omni plaga quam orbis ambit inmensus, reportavit laureas et triumphos, iamque vergens in senium et nomine solo aliquotiens vincens ad tranquilliora vitae discessit.'

    },
    7: {
        question: 'BlVRFfcdsxCDSXQWablab',
        help: 'Eius populus ab incunabulis primis ad usque pueritiae tempus extremum, quod annis circumcluditur fere trecentis, circummurana pertulit bella, deinde aetatem ingressus adultam post multiplices bellorum aerumnas Alpes transcendit et fretum, in iuvenem erectus et virum ex omni plaga quam orbis ambit inmensus, reportavit laureas et triumphos, iamque vergens in senium et nomine solo aliquotiens vincens ad tranquilliora vitae discessit.'

    },
    8: {
        question: 'BlVRvfcdxsFCDSXQWablab',
        help: 'Eius populus ab incunabulis primis ad usque pueritiae tempus extremum, quod annis circumcluditur fere trecentis, circummurana pertulit bella, deinde aetatem ingressus adultam post multiplices bellorum aerumnas Alpes transcendit et fretum, in iuvenem erectus et virum ex omni plaga quam orbis ambit inmensus, reportavit laureas et triumphos, iamque vergens in senium et nomine solo aliquotiens vincens ad tranquilliora vitae discessit.'

    },
    9: {
        question: 'BlVRFCvfcdsxwDSXQWablab',
        help: 'Eius populus ab incunabulis primis ad usque pueritiae tempus extremum, quod annis circumcluditur fere trecentis, circummurana pertulit bella, deinde aetatem ingressus adultam post multiplices bellorum aerumnas Alpes transcendit et fretum, in iuvenem erectus et virum ex omni plaga quam orbis ambit inmensus, reportavit laureas et triumphos, iamque vergens in senium et nomine solo aliquotiens vincens ad tranquilliora vitae discessit.'

    },
}

// Schema Questions

const answerSchema = mongoose.Schema({
    idSocket: String,
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
var allAnswer = []


app.use('/assets', express.static('assets'))
app.set('views', './views')
app.set('view engine', 'ejs')

// Set route
app.get('/', function(req, res){
    res.render('index')
});

app.get('/quiz-phone', function(req, res){
    res.render('quiz-phone')
});

app.get('/country/:country', function(req, res){
    const countryName = req.params.country
    res.render('quiz', {countryName: countryName, datas: questions})
});




// Listen connect
io.on('connection', socket => {
    
    console.log('a user connected')
    socket.on('answerQuestion', data => {
        data.idSocket = socket.id
        if(allAnswer.length != 10) {
            allAnswer = [...allAnswer, data.value]
        } else if(allAnswer.length == 10) {
            data.success = true
            const finalAnswer = new Answer({ idSocket: data.idSocket, 
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
            finalAnswer.save((err, answerSave) => {
                if(err) {
                    console.log(err)
                } else {
                    console.log('success save')
                }
            })
        }
        io.sockets.emit('questionValue', data)
    })

    socket.on('clickInformation', _id => {
        io.sockets.emit('showInformation', _id-1)
    })
    socket.on('disconnect', () => {
        console.log('user disconnected')
    });
});

http.listen(process.env.PORT || 5000, function(){
    console.log('listening on *:3000')
});


