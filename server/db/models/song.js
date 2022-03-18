const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Song extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Artist }) {
      Song.belongsTo(Artist, { foreignKey: 'artistId' });
    }
  }
  Song.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
      allowNull: false,
      unique: 'compositeIndex',
      type: DataTypes.TEXT,
    },
    artistId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: 'compositeIndex',
      references: {
        model: 'Artists',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  }, {
    sequelize,
    modelName: 'Song',
  });
  return Song;
};
