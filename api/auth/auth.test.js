const Users = require(`../users/users-model`)
const db = require(`../../data/dbConfig`)
const request = require(`supertest`)
const server = require(`../server`)

//username already exists:
const user1 = {
    username: `duell`,
    password: `hazard`,
}
//new user:
const user2 = {
    username: `jewel`,
    password: `emerald`
}
//username missing
const user3 = {
    username: ` `,
    password: `password`
}

const user5 = {
    password: `password`
}

//password missing
const user4 = {
    username: `isla`,
    password: ` `
}

const user6 = {
    username: `isla`
}

beforeAll(async () => {
    await db.migrate.rollback()
    await db.migrate.latest()
})

beforeEach(async () => {
    await db.seed.run()
})

describe(`[GET] /`, () => {
    test(`server is running`, async () => {
        const res = await request(server).get(`/`)

        expect(res.status).toBe(200)
        expect(res.body).toMatchObject({message: `Server up and running!`})
    })
})

describe(`[POST] /api/auth/register`, () => {
    test(`[1] creates a new user`, async () => {
        const res = await request(server).post(`/api/auth/register`).send(user2)

        expect(res.status).toBe(201)
        expect(res.body).toMatchObject({username: user2.username})
    })  

    test(`[2] db updates with new user`, async () => {
        await request(server).post(`/api/auth/register`).send(user2)
        const updatedDb = await db(`Users`)

        expect(updatedDb).toHaveLength(4)
    })

    test(`[3] resolves with error if username already exists`, async () => {
        const res = await request(server).post(`/api/auth/register`).send(user1)
        
        expect(res.status).toBe(422)
        expect(res.body).toMatchObject({message: `username taken`})
    })

    test(`[4] resolves in error if username is missing`, async () => {
        let res = await request(server).post(`/api/auth/register`).send(user3)

        expect(res.status).toBe(400)
        expect(res.body).toMatchObject({message: `username and password required`})

        res = await request(server).post(`/api/auth/register`).send(user5)

        expect(res.status).toBe(400)
        expect(res.body).toMatchObject({message: `username and password required`})
    })

    test(`[5] resolves with error if password is missing`, async () => {
        let res = await request(server).post(`/api/auth/register`).send(user4)

        expect(res.status).toBe(400)
        expect(res.body).toMatchObject({message: `username and password required`})

        res = await request(server).post(`/api/auth/register`).send(user6)

        expect(res.status).toBe(400)
        expect(res.body).toMatchObject({message: `username and password required`})
    })
} )
