const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Artist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Song }) {
      Artist.hasMany(Song, { foreignKey: 'artistId', onDelete: 'CASCADE', hooks: true });
    }
  }
  Artist.init({
    name: {
      allowNull: false,
      unique: true,
      type: DataTypes.TEXT,
    },
  }, {
    sequelize,
    modelName: 'Artist',
  });
  return Artist;
};
