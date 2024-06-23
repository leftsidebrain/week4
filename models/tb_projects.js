'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tb_projects extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  tb_projects.init({
    title: DataTypes.STRING,
    start_date: DataTypes.DATE,
    end_date: DataTypes.DATE,
    author: DataTypes.STRING,
    content: DataTypes.TEXT,
    nodejs: DataTypes.BOOLEAN,
    reactjs: DataTypes.BOOLEAN,
    nextjs: DataTypes.BOOLEAN,
    typescript: DataTypes.BOOLEAN,
    durasi: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'tb_projects',
  });
  return tb_projects;
};