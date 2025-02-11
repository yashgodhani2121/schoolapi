const express = require ('express');

const routes= express.Router();
const adminctl= require("../../../../controller/api/v1/admincontroller")
// console.log("admin routes");
routes.post ('/addadmin',adminctl.addadmin);
routes.post ("/loginadmin", adminctl.loginadmin);


module.exports= routes;
