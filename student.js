var express = require('express')
var bp=require('body-parser')
var app = express()
var _ = require('underscore')
app.use(bp.json())

var studentdata=[]
var sid=1

app.use(express.static('public'))

app.get('/loadstudents',(req,res)=>{
    res.send(studentdata);
})

app.get('/loaduser/:id',(req,res)=>{
    var sid=parseInt(req.params.id)
    var mtd=_.findWhere(studentdata,{id:sid})
    if(mtd){
        res.send(mtd)
    }
})

app.post('/addstudent',(req,res)=>{
    var data=req.body
    data.id=uid++
    studentdata.push(data)
    res.send('student added....')
})

app.listen(4000,()=>{
    console.log('server is ready....');
})
