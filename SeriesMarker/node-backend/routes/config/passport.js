var passport = require('passport')

var ExtractJwt = require('passport-jwt').ExtractJwt
var JwtSrategy = require('passport-jwt').Strategy
var LocalStrategy = require('passport-local').Strategy
var User = require('../../models/user')

var localOptions = {
    usernameField: 'email'
}

passport.use(new LocalStrategy(localOptions, function(username, password, done) {
        
        User.findOne({
            $or:[
                {email: username}
            ]
        },function(err, user){

        if (err)
            return done(err);

        if (!user)
            return done(null, false, {
                message: "Credentials not valid."
            })
        
        if (!user.validatePassword(password))
            return done(null, false, {
                message: "Credentials not valid."
            })
        
        return done(null, user)
        
    })
    
}))

var jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: "SECRET"
}

passport.use(new JwtSrategy(jwtOptions, function(jwt_payload, done) {
    var user = User.findById(jwt_payload._id)
        .then(user=>{
            return done(null, user)
        })
        .catch(err=>{
            return done(err)
        })
}))



module.exports = passport
