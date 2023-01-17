const Users = require(`../users/users-model`)

module.exports = (req, res, next) => {
    const {username} = req.body

    Users.findBy({username})
        .then(user => {
            if(!user){
                return res.status(401).json({message: `username and password required`})
            }
            else{
                next()
            }
        })
        .catch(err => {
            return res.status(500).json({message: `Error in validateUsername middleware: ${err}`})
        })
}