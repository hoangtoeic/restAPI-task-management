const express = require('express')
require('./db/mongoose')
const Task=require('./models/task')
const User=require('./models/user')
const userRouter=require('./routers/user')
const taskRouter=require('./routers/task')
const cors = require('cors')


const app = express()
app.use(cors()) 
const port = process.env.PORT || 3000


app.use(express.json())

app.use(userRouter) 
app.use(taskRouter)

//////////////////CORS////////////////////
var allowlist = ['http://localhost:3000/users/login', 'http://example2.com']
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (allowlist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}
////////////////////////////////////////////

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

const bcrypt=require('bcrypt')
const myFunction=async()=>{
    const password='12345678'
    const hashedPassword=await bcrypt.hash(password,8)

    console.log(password)
    console.log(hashedPassword)
    const isMatch=await bcrypt.compare('12345678',hashedPassword)
    console.log(isMatch)
}

myFunction()