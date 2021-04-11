const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite",
});

const Record = sequelize.define("record", {
  randAlphabet: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

sequelize
  .sync({ force: false, alter: true, logging: console.log })
  .then(() => {})
  .catch((e) => console.log(e));

module.exports = { Record };
