const bcrypt = require(`bcryptjs`)

const hash1 = bcrypt.hashSync('123456', 8)
const hash2 = bcrypt.hashSync('9876', 8)
const hash3 = bcrypt.hashSync('36912', 8)


exports.seed = async function(knex) {
  await knex('users').truncate()
  await knex('users').insert([
    {
      id: 1, 
      username: `duell`, 
      password: hash1}, //123456
    {
      id: 2, 
      username: `marvel`, 
      password: hash2}, //9876
    {
      id: 3, 
      username: `DC`, 
      password: hash3} //36912
  ]);
};