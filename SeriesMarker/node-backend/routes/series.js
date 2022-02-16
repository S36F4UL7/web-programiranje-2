var express = require('express')
var jwt = require('express-jwt')
var Serie = require('../models/serie')
var passport = require('./config/passport')

var router = express.Router()


router.get("/:creatorId", 
    async (req, res, next)=>{ 
        var series = await Serie.find({creatorId: req.params.creatorId});
        res.send(series)
    }
)

router.get("/:id",
    async (req, res, next)=>{ 
        var serie = await Serie.findById(req.params.id);
        res.send(serie)
    }
)

router.post("/",
    passport.authenticate('jwt', {session:false}),
    (req, res)=>{
        res.send(Serie.sacuvaj(req.body));
    }
)

router.put("/", 
    async (req, res, next)=> {
        res.send(await Serie.findByIdAndUpdate(req.body._id, req.body));
    }
)

router.delete("/:id",
    async (req, res, next)=>{
        res.send(await Serie.findByIdAndDelete(req.params.id));
    }
)

module.exports = router