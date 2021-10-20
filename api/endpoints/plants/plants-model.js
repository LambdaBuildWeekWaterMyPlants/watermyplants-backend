const db = require('../../data/db-config')

function getAll(){
    return db('plants')
}

function findBy(filter){
    return db('plants').where(filter)
}

async function addPlant(plant){
    const [newPlant] = await db('plants').insert(plant, ['*'])
    return newPlant
}

async function updatePlant(plant_id, plant){
    const [updatedPlant] = await db('plants').update(plant, ['*']).where('plant_id', plant_id)
    return updatedPlant
}

async function removePlant(plant_id){
    const removedPlant = await db('plants').where('plant_id', plant_id).first()
    await db('plants').where('plant_id', plant_id).delete()
    return removedPlant
}

module.exports = {
    getAll,
    findBy,
    addPlant,
    updatePlant,
    removePlant,
}