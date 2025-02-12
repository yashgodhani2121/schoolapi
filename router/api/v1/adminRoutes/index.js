const express = require ('express');

const routes= express.Router();
const adminctl= require("../../../../controller/api/v1/admincontroller")
const passport = require ("passport");
// console.log("admin routes");
routes.post ('/addadmin',adminctl.addadmin);
routes.post ("/loginadmin", adminctl.loginadmin);
routes.get ("/adminProfile", passport.authenticate("jwt",{failureRedirect:"/api/adminUnauth" }),adminctl.adminProfile)
routes.get ("/adminUnauth", async(req,res)=>{
    try{
        res.status(200).json({message:"Admin Unauth"})
    }
    catch(err){
        return res.status(400).json({ message: "server error", error: err })
    }
} );
routes.put("/editAdminProfile/:id", passport.authenticate("jwt",{failureRedirect:"/api/adminUnauth" }),adminctl.editAdminProfile);
routes.get ("/adminLogout",async (req,res)=>{
    try {
        req.session.destroy((err)=>{
            if(err){
                return res.status(400).json({ message: "error", error: err })

            }
            else{
                res.status(200).json({message:"Logout"})
            }
        })
        
    } catch (error) {
        return res.status(400).json({ message: "server error", error: err })
    }
})
routes.post("/Adminchangepassword",passport.authenticate("jwt",{failureRedirect:"/api/adminUnauth" }),adminctl.Adminchangepassword);


module.exports= routes;
