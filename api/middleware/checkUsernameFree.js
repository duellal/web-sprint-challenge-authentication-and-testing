const Users = require(`../users/users-model`)

module.exports = (req, res, next) => {
    let { username } = req.body

    if(username === undefined){
        return res.status(400).json({message: `username and password required`})
    }
    else if(username){
         username = username.trim()

        if(username.length === 0){
                return res.status(400).json({message: `username and password required`})
            }
    }
        
    
    Users.findBy({username: username})
        .then(user => {
            if(user === undefined || !user.length === undefined){
                next()
            }
            else{
                return res.status(422).json({message: `username taken`})
            }
        })
        .catch(err => {
            return res.status(500).json({message: `Error in checkUsernameFree middleware: ${err}`})
        })
}