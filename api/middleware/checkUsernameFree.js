const Users = require(`../users/users-model`)

module.exports = (req, res, next) => {
    const {username} = req.body

    Users.findBy({username})
        .then(user => {
            if(user === undefined || !user.length){
                next()
            }
            else{
                return res.status(422).json({message: `username taken`})
            }
        })
        .catch(err => {
            return res.status(500).json({message: `Error in existingUsername middleware: ${err}`})
        })
}