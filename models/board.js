'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Board extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Board.init({
    boardId: {
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    nickname: DataTypes.STRING,
    title: DataTypes.STRING,
    contents: DataTypes.STRING,
    day: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Board',
  });
  return Board;
};