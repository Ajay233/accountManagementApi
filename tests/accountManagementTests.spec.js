const model = require('../models/index.js');
const request = require('supertest');
const http = require('../app.js')
const assert = require('assert')

const initialiseUserTable = async () => {
  await model.Users.drop();
}

beforeEach(async () => {
  await model.Users.sync({ force: true }).then(() =>{
    console.log("DB reset")
  }).catch((error) => {
    console.log(error)
  })
});

afterEach(async () => {
  await model.sequelize.close();
})

describe('Account management', () => {
  describe('New account endpoint', () => {
    it('should create a new account', async (done) => {
      const res = await request(http)
      .post('/accountManagementApi/newAccount')
      .send({
        "firstName": "Jo",
        "lastName": "Bloggs",
        "password": "testPassword",
        "avatarUrl": "test",
        "email": "test@test.com"
      })

      expect(res.status).toEqual(200)
      expect(res.body.firstName).toEqual("Jo")
      expect(res.body.lastName).toEqual("Bloggs")
      expect(res.body.nickName).toEqual(null)
      expect(res.body.password).toEqual("")
      expect(res.body.avatarUrl).toEqual("test")
      expect(res.body.email).toEqual("test@test.com")
      done();

    })
  })
})
