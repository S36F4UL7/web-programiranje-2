var express = require('express')
var User = require('../models/user')
var passport = require('./config/passport')

var router = express.Router()


router.post("/register", (req, res) =>{
    var user = new User();
    user.email = req.body.email;
    
    user.setPassword(req.body.password);

    user.save((err)=>{
        if (!err)
        {
            var token = user.generateJwt();
            res.status(200);
            res.json({
                "token": token
            })
        }
    })

})

router.post("/login", 
    passport.authenticate('local', {session: false}) , 
    async (req, res) =>{
    
    var user = await User.findOne({email: req.body.email})
    var token = user.generateJwt();
    res.status(200).json(token);

})

router.get("/", 
    passport.authenticate('jwt',{session:false}), 
    async (req, res) =>{
    
        res.status(200).send();
    
})

module.exports = router