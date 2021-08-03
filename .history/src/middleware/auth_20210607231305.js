const jwt = require("jsonwebtoken");
const StudentModel = require("../models/register");

const auth = async (req, res, next) => {
    console.log('auth', req.cookies.jwt);
    try{
        if(req.cookies.jwt){
           const tokenInRequest = req.cookies.jwt;
           const verifyUser = await jwt.verify(tokenInRequest, process.env.SECRET_KEY);
           console.log('auth2', verifyUser);
           next();
        }
    }
    catch(err){
        res.status(401).send(err);
    }
}

module.exports = auth;