const router = require('express').Router()


router.get('/', (req, res, next)=>{
    res.json({message: 'restricted content'})
    next()
})

module.exports = router