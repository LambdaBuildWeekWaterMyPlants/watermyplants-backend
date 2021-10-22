const db = require('../../data/db-config')

function findBy(filter){
    return db('users').where(filter)
}

async function addUser(user){
    const [newUser] = await db('users').insert(user, ['user_id', 'username', 'phoneNumber'])
    return newUser
}

async function updateUser(user_id, user){
    const [updatedUser] = await db('users').update(user, ['user_id', 'username', 'phoneNumber']).where('user_id', user_id)
    return updatedUser
}

module.exports = {
    findBy,
    addUser,
    updateUser,
}