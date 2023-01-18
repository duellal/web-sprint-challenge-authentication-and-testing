const Users = require(`./users-model`)
const db = require(`../../data/dbConfig`)

//username already exists for findBy:
const user1 = {
    username: `duell`,
    password: `123456`,
}
//new user for add:
const user2 = {
    username: `jewel`,
    password: `emerald`
}


beforeAll(async () => {
    await db.migrate.rollback()
    await db.migrate.latest()
})

beforeEach(async () => {
    await db.seed.run()
})

describe(`users-model is working correctly`, () => {
    test(`[1] findAll() finds all the users in the db`, async () => {
        const res = await Users.findAll()

        expect(res).toHaveLength(3)
    })

    test(`[2] findBy() finds user by username`, async () => {
        const res = await Users.findBy({username: user1.username})

        expect(res).toMatchObject({username: user1.username})
    })

    test(`[3] add() creates a new user`, async () => {
        const res = await Users.add(user2)
       
        expect(res).toMatchObject(user2)
    })

    test(`[4] add() adds new user to db`, async () => {
        Users.add(user2)
        const updatedDb = await Users.findAll()

        expect(updatedDb).toHaveLength(4)
    })
})