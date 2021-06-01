const {exec} = require('child_process');

module.exports = {
  migrate: async () => {
    const { stdout, stderr } = await exec('npx sequelize db:migrate');
    stdout ? console.log("Migration completed") : console.error('stderr:', stderr);
  }
}
