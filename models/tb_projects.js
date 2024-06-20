"use strict";
const { Model } = require("sequelize");
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
  tb_projects.init(
    {
      name: DataTypes.STRING,
      start_date: DataTypes.DATE,
      end_date: DataTypes.DATE,
      description: DataTypes.TEXT,
      technologies: DataTypes.ARRAY(DataTypes.STRING),
      image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "tb_projects",
    }
  );
  return tb_projects;
};
