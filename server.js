var express = require('express')
var bp = require('body-parser')

const jwt = require('jsonwebtoken')
const config = require('./config.json')

const cors = require('cors')
var app = express()

// var interceptor = require('./middleware')
var _ = require('underscore')
app.use(bp.urlencoded({extended:true}))



// app.use(interceptor.authUser)

var userdata = []
var uid = 1
app.use(cors())
app.use(express.static('public'))

// app.get('/loadusers', interceptor.logger, (req, res) => {
//     res.send(userdata);
// })

app.delete('/deleteuser/:id', (req, res) => {
    var uid = parseInt(req.params.id)
    var mtd = _.findWhere(userdata, { id: uid })
    if (mtd) {
        userdata = _.without(userdata, mtd)
        res.send(mtd)
    }
})

app.put('/update')

app.get('/loaduser/:id', (req, res) => {
    const data = req.body


    var uid = parseInt(req.params.id)
    // var mtd;
    var mtd = _.findWhere(userdata, { id: uid })
    // userdata.forEach(function(todo){
    //     if(uid == todo.id){
    //     mtd=todo
    //     }
    // })
    if (mtd) {
        res.send(mtd)
    }
})




// for array of data
// [
//     { "Lastname": "Test", "Firstname": "Test", "Department": "IT", "Location": "", "Company": "Test"},
//     { "Lastname": "Test2", "Firstname": "Test", "Department": "DEV", "Location": "", "Company": "Test"},
//     { "Lastname": "Test3", "Firstname": "Test", "Department": "SD", "Location": "", "Company": "Test"}
// ]
// var data = req.body;
// data.forEach(user => {
//     user.id = uid++;
//     userdata.push(user);
// });
// res.send('Users added....');

app.post('/adduser', (req, res) => {
    var data = req.body
    data.id = uid++
    userdata.push(data)
    
    // res.send('user added....')
    const user = {
        "email": data.email,
        "name": data.name
    }
    const token = jwt.sign(user, config.secret, { expiresIn: config.tokenlife })
    const response = {
        "status": "user added....",
        "token": token
    }

    res.status(200).json(response)
});

app.use(require('./tokenchecker'))
app.get('/loadusers', (req, res) => {
    // res.send('I am secured')
    res.send(userdata);
})





app.listen(4000, () => {
    console.log('server is ready....');
})