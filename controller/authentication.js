const {user} = require('../models/models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const secretKey = process.env.SECRETKEY;
const signUp = async (req , res) =>{

   try {
        const {username, email, password} = req.body;

        const checkingUser = await user.findOne({
            where: {email :email,}
        })
        if (checkingUser) {
           return res.status(401).json('user already exist');
        }

        const hashpass = bcrypt.hashSync(password, 12);

        const newUser = await user.create({username: username, email: email, password: hashpass});

         res.status(201).send(newUser);
    }
    catch(err){
        res.status(401).send('error creating user');
    }
}


const login = async(req, res , next) => {

    const {email, password} = req.body

    const checkUser = await user.findOne({
        where: {email: email}
    })
    if(!email || !password) {
        return res.status(400).json({error: "Email or password not found"})
    }

    const validPass = await bcrypt.compare(password, checkUser.password)
    if(!validPass)
    {
        return res.status(400).json({error: "Invalid password"})
    }
    const token = jwt.sign({email: email , role : checkUser.role }, secretKey, {expiresIn: '1h'})

    const verifyToken = await jwt.verify(token, secretKey)
    if(!verifyToken)
    {
        return res.status(400).json({error: "Invalid token"})
    }
    console.log("User logged in and token generated successfully")
     res.status(200).json({token: token})
    next()
}
module.exports = {signUp , login}
