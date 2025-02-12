const passport = require('passport');

const jwtstegy = require('passport-jwt').Strategy;

const Ejwt  = require('passport-jwt').ExtractJwt;

var opts = {
    jwtFromRequest: Ejwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'yash'
}

const Admin =require ("../model/adminmodel");

passport.use (new jwtstegy(opts, async function (payload, done)  {

    let checkuser= await Admin.findOne({email:payload.Admindata.email})
    if( checkuser){
        return done (null,checkuser)
    }
    else{
        return done(null, false)
    }

}))

passport.serializeUser (function(user, done) {
    done(null, user.id);
    });

passport.deserializeUser (async function(id, done) {

    let userdata= await Admin.findById(id)

    if( userdata){
        return done(null,userdata)
        }
    else{
        return done(null, false)
    }


})

module.exports= passport;

