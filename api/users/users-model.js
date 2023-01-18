const db = require(`../../data/dbConfig`)

const findAll = () => {
    return db('users')
}

const findBy = (filter) => {
    return db(`users`)
        .where(filter)
        .first()
}

const add = async (user) => {
    return await db(`users`)
        .insert(user)
        .then( id => {
            return findBy({id: id})
        })
        .catch(err => {
            console.log(`ERROR catching in auth-router add() function:`, err)
        })
}

module.exports = {
    findAll, 
    findBy,
    add
}