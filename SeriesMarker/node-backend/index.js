var express = require("express")
var config = require("./config")
var cors = require('cors')
var serieRoutes = require('./routes/series')
var authRoutes = require('./routes/auth')

//var passport = require('passport')
var passport = require('./routes/config/passport')

var app = express()
var corsOptions = {
    origin: "http://localhost:4200",
    optionsSuccessStatus: 200, // For legacy browser support
    methods: "GET, POST, DELETE, PUT"
}
app.use(cors(corsOptions))

var mongoose = require("mongoose")
mongoose.connect(config.dbConnection, {useNewUrlParser: true, useUnifiedTopology: true})

app.use(express.json())
app.use(passport.initialize())
app.use((err, req, res, next)=>{
    console.log(err.stack)
    res.status(500).send("There was an error.")
})

app.use('/series',serieRoutes)
app.use('/auth',authRoutes)

app.get('/',(req, res) =>{
    
    res.send("Hello world.")
})

app.listen(config.port, () => {
    console.log(`Running on port: ${config.port}`)
})
