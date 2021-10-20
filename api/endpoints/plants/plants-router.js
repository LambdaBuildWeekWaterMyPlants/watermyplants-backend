const router = require('express').Router()
const {validatePlantCredentials, checkPlantIdExists} = require('./plants-middleware')
const Plants = require('./plants-model')


router.get('/', async (req, res, next)=>{
    try{
        const plants = await Plants.getAll()
        res.status(200).json(plants)
    }catch(err){
        next(err)
    }
})

router.post('/', validatePlantCredentials, async (req, res, next)=>{
    try{
        const newPlant = await Plants.addPlant(req.body)
        res.status(201).json(newPlant)
    }catch(err){
        next(err)
    }
})

router.put('/:plant_id', checkPlantIdExists, async (req, res, next)=>{
    try{
        const updatedPlant = await Plants.updatePlant(req.params.plant_id, req.body)
        res.status(200).json(updatedPlant)
    }catch(err){
        next(err)
    }
})

router.delete('/:plant_id',checkPlantIdExists, async (req, res, next)=>{
    try{
        const removedPlant = await Plants.removePlant(req.params.plant_id)
        res.status(200).json(removedPlant)
    }catch(err){
        next(err)
    }
})

module.exports = router