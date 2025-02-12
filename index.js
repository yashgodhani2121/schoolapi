const express= require('express');
const port =8000;

const app = express();
const db = require("./config/db");
const passport = require("passport");

const jwtstegy = require ("./config/passport_jwt_strategy");
const session = require("express-session");

app.use(session({
    name:"Jwtsession",
    secret: "jwtjj",
    saveUninitialized: false,
    resave: false,
    cookie:{
        maxAge: 1000*60*60
    }
}))


app.use (passport.initialize());
app.use (passport.session())
app.use (express.urlencoded());
app.use("/api",require("./router/api/v1/adminRoutes"))
app.listen(port,(err)=>{
    if (err){
        console.log(err);
        return false;
    }
    console.log ("Server is running on port",port);
})