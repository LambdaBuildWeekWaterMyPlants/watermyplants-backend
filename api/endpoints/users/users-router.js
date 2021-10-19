const router = require('express').Router()
const { checkUserIdExists } = require('./user-middleware')
const Users = require('./users-model')

router.put('/:user_id', checkUserIdExists, (req, res, next)=>{
    Users.updateUser(req.params.user_id, req.body)
        .then(updatedUser=>{
            res.status(200).json(updatedUser)
        })
        .catch(next)
})

module.exports = router
