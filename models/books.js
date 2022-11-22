'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Books extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Books.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    name: DataTypes.STRING,
    year: DataTypes.INTEGER,
    author: DataTypes.STRING,
    summary: DataTypes.STRING,
    publisher: DataTypes.STRING,
    pageCount: DataTypes.INTEGER,
    readPage: DataTypes.INTEGER,
    finished: DataTypes.BOOLEAN,
    reading: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Books',
  });
  return Books;
};