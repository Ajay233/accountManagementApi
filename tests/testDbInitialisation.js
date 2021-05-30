const {exec} = require('child_process');

module.exports = async () => {
  const { stdout, stderr } = await exec('sequelize db:migrate');
  stdout ? console.log("Migration completed") : console.error('stderr:', stderr);
}
