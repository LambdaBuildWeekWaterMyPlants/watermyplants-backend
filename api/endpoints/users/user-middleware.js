const Users = require('../users/users-model')

const validateUserCredentials = (req, res, next)=>{
    const {username, phoneNumber, password} = req.body
    if(!username || !phoneNumber || !password){
        next({
            status: 400, 
            message: 'username, phone number, & password required'
        })
    }else{
        if(username.trim() === ''){
            next({
                status: 400, 
                message: "username can't be an empty string"
            })
        }if(phoneNumber.trim() === ''){
            next({
                status: 400, 
                message: "phone number can't be an empty string"
            })
        }if(password.trim() === ''){
            next({
                status: 400, 
                message: "password can't be an empty string"
            })
        }
        req.password = password.trim()
        req.username = username.trim()
        req.phoneNumber = phoneNumber.trim()
        next()
    }
}

const validateUserUpdateCredentials = (req, res, next)=>{
    const {username, phoneNumber, password, newPassword} = req.body
    if(!username || !phoneNumber || !password){
        next({
            status: 400, 
            message: 'username, phone number, & password required'
        })
    }else{
        if(username.trim() === ''){
            next({
                status: 400, 
                message: "username can't be an empty string"
            })
        }if(phoneNumber.trim() === ''){
            next({
                status: 400, 
                message: "phone number can't be an empty string"
            })
        }if(password.trim() === ''){
            next({
                status: 400, 
                message: "password can't be an empty string"
            })
        }
        req.password = password.trim()
        req.username = username.trim()
        req.phoneNumber = phoneNumber.trim()
        req.newPassword = newPassword.trim()
        next()
    }
}

const validateUserLoginCredentials = (req, res, next)=>{
    const {username, password} = req.body
    if(!username || !password){
        next({
            status: 400, 
            message: 'username & password required'
        })
    }else{
        next()
    }
}

const checkUsernameFree = async(req, res, next)=>{
    try{
        const {username} = req.body
        const users = await Users.findBy({username: username})
        if(!users.length){
            next()
        }else{
            next({
                status: 409, 
                message: 'username taken'
            })
        }
    }catch(err){
        next(err)
    }
}

const checkUsernameExists = async(req, res, next)=>{
    try{
        const {username} = req.body
        const users = await Users.findBy({username: username})
        if(users.length){
            req.user = users[0]
            next()
        }else{
            next({
                status: 401, 
                message: 'username does not exist'})
        }
    }catch(err){
        next(err)
    }
}

const checkUserIdExists = async(req, res, next)=>{
    try{
        const {user_id} = req.params
        const users = await Users.findBy({user_id: user_id})
        if(users.length){
            req.user = users[0]
            next()
        }else{
            next({
                status: 401, 
                message: 'id does not exist'})
        }
    }catch(err){
        next(err)
    }
}


module.exports = {
    validateUserCredentials,
    validateUserUpdateCredentials,
    validateUserLoginCredentials,
    checkUsernameFree,
    checkUsernameExists,
    checkUserIdExists,
}