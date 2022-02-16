var express = require('express')
var jwt = require('express-jwt')
var Serie = require('../models/serie')
var passport = require('./config/passport')

var router = express.Router()


router.get("/", 
    async (req, res, next)=>
    { 
        var series = await Serie.find()
        res.send(series)
    }
)

router.get("/:id",
    async (req, res, next)=>
    { 
        var serie = await Serie.findById(req.params.id)
        res.send(serie)
    }
)

router.post("/",
    passport.authenticate('jwt', {session:false}),
    (req, res)=>{
        res.send(Serie.sacuvaj(req.body))
    }
)

router.put("/", (req, res)=>{
    res.send("Update existing serie.")
})

router.delete("/", (req, res)=>{
    res.send("Delete serie.")
})

module.exports = router