// const db = require(`../../data/dbConfig`)
// const checkUsernameFree = require(`./checkUsernameFree`)
// const validateUsername = require(`./validateUsername`)
// const retricted = require(`./restricted`)

// //username already exists:
// const user1 = {
//     username: `duell`,
//     password: `hazard`,
// }
// //new user:
// const user2 = {
//     username: `jewel`,
//     password: `emerald`
// }
// //username missing
// const user3 = {
//     username: ``,
//     password: `password`
// }
// //password missing
// const user4 = {
//     username: `isla`,
//     password: ``
// }

// //Need to mock req, res, next?

// describe(`checkUsernameFree middleware`, () => {
//     test(`[1] responds with error if username exists`, async () => {
//         mockRequest = user1
//         const res = checkUsernameFree(user1)
        
//         expect(res).toMatchObject(user1)
//     })
// })