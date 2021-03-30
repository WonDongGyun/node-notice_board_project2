'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Comment.init({
    commentId: {
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    boardId: DataTypes.INTEGER,
    nickname: DataTypes.STRING,
    comment: DataTypes.STRING,
    commentDay: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};