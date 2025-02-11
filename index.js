const express= require('express');
const port =8000;

const app = express();
const db = require("./config/db");
app.use (express.urlencoded());
app.use("/api",require("./router/api/v1/adminRoutes"))
app.listen(port,(err)=>{
    if (err){
        console.log(err);
        return false;
    }
    console.log ("Server is running on port",port);
})