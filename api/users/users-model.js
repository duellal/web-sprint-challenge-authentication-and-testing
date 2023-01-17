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
    const newUser = await db('users').insert(user)
    return findBy(newUser)
}

module.exports = {
    findAll, 
    findBy,
    add
}