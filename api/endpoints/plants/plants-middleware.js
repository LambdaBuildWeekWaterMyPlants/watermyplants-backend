const Plants = require('./plants-model')

const validatePlantCredentials = (req, res, next)=>{
    const {nickname, species, h2o_frequency} = req.body
    if(!nickname || !species || !h2o_frequency){
        next({
            status: 400, 
            message: 'nickname, species, & h2o_frequency required'
        })
    }else{
        next()
    }
}

const checkPlantIdExists = async(req, res, next)=>{
    try{
        const {plant_id} = req.params
        const plants = await Plants.findBy({plant_id: plant_id})
        if(plants.length){
            req.plant = plants[0]
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
    validatePlantCredentials, 
    checkPlantIdExists
}