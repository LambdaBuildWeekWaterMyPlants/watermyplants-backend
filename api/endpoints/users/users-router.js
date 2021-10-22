const router = require('express').Router()
const { validateUserUpdateCredentials, checkUserIdExists } = require('./user-middleware')
const Users = require('./users-model')
const bcrypt = require('bcryptjs')

router.put('/:user_id',validateUserUpdateCredentials, checkUserIdExists, (req, res, next)=>{
    if(bcrypt.compareSync(req.password, req.user.password)){
        if(req.newPassword === ''){
            Users.updateUser(req.params.user_id, {username:req.username, phoneNumber:req.phoneNumber})
                .then(updatedUser=>{
                    res.status(200).json(updatedUser)
                })
                .catch(next)
        }else{
            const hash = bcrypt.hashSync(req.newPassword, 8)
            Users.updateUser(req.params.user_id, {username:req.username, phoneNumber: req.phoneNumber, password: hash})
                .then(updatedUser=>{
                    res.status(200).json({...updatedUser, message:"Password successfully changed."})
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
