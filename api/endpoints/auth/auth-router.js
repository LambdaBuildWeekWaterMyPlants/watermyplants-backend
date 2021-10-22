const router = require('express').Router()
const { validateUserCredentials, checkUsernameFree, checkUsernameExists, validateUserLoginCredentials} = require('../users/user-middleware')
const Users = require('../users/users-model')
const {JWT_SECRET} = require('../../secret')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

router.post('/register',validateUserCredentials,checkUsernameFree, (req, res, next)=>{
    const {username, phoneNumber, password} = req.body
    const hash = bcrypt.hashSync(password, 8)
    Users.addUser({username, phoneNumber, password: hash})
        .then(newUser=>{
            res.status(201).json(newUser)
        })
        .catch(next)
})

router.post('/login',validateUserLoginCredentials,checkUsernameExists, (req, res, next)=>{
    if(bcrypt.compareSync(req.body.password, req.user.password)){
        const token = tokenCreate(req.user)
        const {user_id, username, phoneNumber} = req.user
        res.status(200).json({
            message: `Welcome, ${req.user.username}`,
            user:{
                user_id: user_id,
                username: username, 
                phoneNumber: phoneNumber 
            },  
            token
        })
    }else{
        next({
            status: 401, 
            message: "invalid credentials"
        })
    }
})

function tokenCreate(user){
    const payload = {
        subject: user.id,
        username: user.username
    }
    const options = {
        expiresIn: '1d'
    }
    return jwt.sign(payload, JWT_SECRET, options)
}

module.exports = router