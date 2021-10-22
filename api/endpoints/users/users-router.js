const router = require('express').Router()
const { validateUserCredentials, checkUserIdExists } = require('./user-middleware')
const Users = require('./users-model')
const bcrypt = require('bcryptjs')

router.put('/:user_id',validateUserCredentials, checkUserIdExists, (req, res, next)=>{
    if(bcrypt.compareSync(req.body.password, req.user.password)){
        if(req.body.newPassword){
            const {username, phoneNumber, newPassword} = req.body
            const hash = bcrypt.hashSync(newPassword, 8)
            Users.updateUser(req.params.user_id, {username, phoneNumber, password: hash})
                .then(updatedUser=>{
                    res.status(200).json({...updatedUser, message:"Password successfully changed."})
                })
                .catch(next)
        }else{
            const {username, phoneNumber} = req.body
            Users.updateUser(req.params.user_id, {username, phoneNumber})
                .then(updatedUser=>{
                    res.status(200).json(updatedUser)
                })
                .catch(next)
        }
    }else{
        next({
            status: 401, 
            message: "invalid password"
        })
    }
})

module.exports = router
