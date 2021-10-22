const request = require('supertest')
const server = require('../server')
const db = require('../data/db-config')

beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})
afterAll(async () => {
  await db.destroy()
})

it('sanity check', () => {
  expect(true).not.toBe(false)
})

describe('server.js', () => {
  it('is the correct testing environment', async () => {
    expect(process.env.NODE_ENV).toBe('testing')
  })
})
describe('--- auth-router.js ---', ()=>{
  describe('[POST] register new user', () => {
    let res
    beforeAll(async()=>{
        res = await request(server)
            .post('/api/auth/register')
            .send({
                "username": "TestingName123",
                "phoneNumber": "123-321-4321",
                "password": "abc123"
            })
    })
    it('registers new user', async () => {
        expect(res.status).toBe(201)
    })
    it('responds with correct username', async()=>{
      expect(res.body.username).toBe('TestingName123')
    })
    it('returns user_id, username, & phoneNumber', async()=>{
      expect(res.body).toHaveProperty('user_id')
      expect(res.body).toHaveProperty('username')
      expect(res.body).toHaveProperty('phoneNumber')
    })

  })

  describe('[POST] login user', () => {
    let res
    beforeAll(async()=>{
        res = await request(server)
            .post('/api/auth/login')
            .send({
                "username": "TestingName123",
                "password": "abc123"
            })
    })
    it('login user', async () => {
        expect(res.status).toBe(200)
    })
    it('responds with welcome message', async()=>{
      expect(res.body.message).toMatch(/welcome, TestingName123/i)
    })
    it('returns message, user, & token', async()=>{
      expect(res.body).toHaveProperty('message')
      expect(res.body).toHaveProperty('user')
      expect(res.body).toHaveProperty('token')
    })


  })
})

describe('--- plants-router.js ---', ()=>{
  let res
  beforeEach(async()=>{
      res = await request(server)
          .post('/api/auth/login')
          .send({
              "username": "TestingName123",
              "password": "abc123"
          })
      })
  describe('[POST] Creates new plant', ()=>{
    beforeEach(async()=>{
      res = await request(server).post('/api/plants').set('Authorization', res.body.token).send({
        "nickname": "Golden Pothos",
        "species": "Epipremnum Aureum",
        "h2o_frequency": "Once every 4 Days"
      })
    })
    it('responds with correct status 201', async()=>{
      expect(res.status).toBe(201)
    })
    it('response has plant_id, nickname, species, and h2o_frequency properties', async()=>{
      expect(res.body).toHaveProperty('plant_id')
      expect(res.body).toHaveProperty('nickname')
      expect(res.body).toHaveProperty('species')
      expect(res.body).toHaveProperty('h2o_frequency')
    })
  })

  describe('[GET] Gets all plants', ()=>{
    beforeEach(async()=>{
      res = await request(server).get('/api/plants').set('Authorization', res.body.token).send({
        "nickname": "Golden Pothos",
        "species": "Epipremnum Aureum",
        "h2o_frequency": "Once every 4 Days"
      })
    })
    it('responds with correct status 200', async()=>{
      expect(res.status).toBe(200)
    })
    it('responds with all plants (2)', async()=>{
      expect(res.body).toHaveLength(2)
    }) 
  })


  describe('[PUT] updates plants', ()=>{
    beforeEach(async()=>{
        res = await request(server).put('/api/plants/1').set('Authorization', res.body.token).send({
          "nickname": "GoldenPothos",
          "species": "Epipremnum Aureum",
          "h2o_frequency": "Once every four Days"
        })
      })
      it('responds with correct status 200', async()=>{
        expect(res.status).toBe(200)
      })
      it('updates h2o_frequency from "Once every 4 Days" to "Once every four Days"', async()=>{
        expect(res.body.h2o_frequency).toMatch(/once every four days/i)
      })
      it('response has plant_id, nickname, species, and h2o_frequency properties', async()=>{
        expect(res.body).toHaveProperty('plant_id')
        expect(res.body).toHaveProperty('nickname')
        expect(res.body).toHaveProperty('species')
        expect(res.body).toHaveProperty('h2o_frequency')
      })
  })

  describe('[DELETE] deletes a plant', ()=>{
    beforeEach(async()=>{
        res = await request(server).delete('/api/plants/1').set('Authorization', res.body.token)
      })
      it('responds with correct status 200 and response has plant_id, nickname, species, and h2o_frequency properties of deleted plant', async()=>{
        expect(res.status).toBe(200)
        expect(res.body).toHaveProperty('plant_id')
        expect(res.body).toHaveProperty('nickname')
        expect(res.body).toHaveProperty('species')
        expect(res.body).toHaveProperty('h2o_frequency')
      })
      it('responds with "id does not exist" after deletion of plant', async()=>{
        expect(res.body.message).toMatch(/id does not exist/i)
      })
  })

  describe('--- users-router.js ---', ()=>{
    beforeEach(async()=>{
      res = await request(server).put('/api/users/1').set('Authorization', res.body.token).send({
        "username": "Test1",
        "phoneNumber": "123-321-4321",
        "password": "abc123",
        "newPassword": "123abc"
      })
    })
    it('responds with correct status 200 and response has user_id, username, phoneNumber & responds with correct password changed message', async()=>{
      expect(res.status).toBe(200)
      expect(res.body).toHaveProperty('user_id')
      expect(res.body).toHaveProperty('username')
      expect(res.body).toHaveProperty('phoneNumber')
      expect(res.body.message).toMatch(/password successfully changed./i)
    })
  })
})
