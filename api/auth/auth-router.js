const router = require('express').Router();
const checkUsernameFree = require(`../middleware/checkUsernameFree`)
const validateUsername = require(`../middleware/validateUsername`)
const {JWT_SECRET, BCRYPT_ROUNDS} = require(`./secrets`)
const jwt = require(`jsonwebtoken`)
const bcrypt = require(`bcryptjs`)
const Users = require(`../users/users-model`)


router.post('/register', checkUsernameFree, (req, res) => {
  /*
    IMPLEMENT
    You are welcome to build additional middlewares to help with the endpoint's functionality.
    DO NOT EXCEED 2^8 ROUNDS OF HASHING!

    1- In order to register a new account the client must provide `username` and `password`:
      {
        "username": "Captain Marvel", // must not exist already in the `users` table
        "password": "foobar"          // needs to be hashed before it's saved
      }

    2- On SUCCESSFUL registration,
      the response body should have `id`, `username` and `password`:
      {
        "id": 1,
        "username": "Captain Marvel",
        "password": "2a$08$jG.wIGR2S4hxuyWNcBf9MuoC4y0dNy7qC/LbmtuFBSdIhWks2LhpG"
      }

    3- On FAILED registration due to `username` or `password` missing from the request body,
      the response body should include a string exactly as follows: "username and password required".

      //In middleware existingUsername.js:
    4- On FAILED registration due to the `username` being taken,
      the response body should include a string exactly as follows: "username taken".
  */

      let {username, password} = req.body

      if(password === undefined){
        return res.status(400).json({message: `username and password required`})
      }
      else if(password){
        password = password.trim()

        if(password.length === 0)
          return res.status(400).json({message: `username and password required`})
      }
      
      const hash = bcrypt.hashSync(password, BCRYPT_ROUNDS)
      const newUser = {username, password: hash}

      Users.add(newUser)
        .then(user => {
          res.status(201).json(user)
        })
        .catch(() => {
          res.status(400).json({message: `username and password required`})
        })
      
});

router.post('/login', validateUsername, (req, res) => {
  /*
    IMPLEMENT
    You are welcome to build additional middlewares to help with the endpoint's functionality.

    1- In order to log into an existing account the client must provide `username` and `password`:
      {
        "username": "Captain Marvel",
        "password": "foobar"
      }

    2- On SUCCESSFUL login,
      the response body should have `message` and `token`:
      {
        "message": "welcome, Captain Marvel",
        "token": "eyJhbGciOiJIUzI ... ETC ... vUPjZYDSa46Nwz8"
      }

    3- On FAILED login due to `username` or `password` missing from the request body,
      the response body should include a string exactly as follows: "username and password required".

    4- On FAILED login due to `username` not existing in the db, or `password` being incorrect,
      the response body should include a string exactly as follows: "invalid credentials".
  */
    
    let {username, password} = req.body

    Users.findBy({username: username})
      .then(user => {
        if(user && bcrypt.compareSync(password, user.password)){
          const token = buildToken(user)

          res.status(200).json({
            message: `welcome, ${username}`,
            token
          })
        } 
        else if (!username || !password){
          res.status(400).json({message: `username and password required`})
        }      
        else{
          res.status(400).json({message: `invalid credentials`})
          }
      })
      .catch(err => {
        res.status(500).json({
          message: `Error occurred in auth-router:`, err
        })
      })
});

const buildToken = (user) => {
  const payload = {
    subject: user.id,
    username: user.username,
  }

  const expires = {
    expiresIn: `1d`
  }

  return jwt.sign(payload, JWT_SECRET, expires)
}

module.exports = router;
