const model = require('../models/index.js');

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
    it('should create a new account', () => {

    })
  })
})
