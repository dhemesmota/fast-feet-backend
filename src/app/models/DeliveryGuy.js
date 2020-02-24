import Sequelize, { Model } from 'sequelize';

class DeliveryGuy extends Model {
  static init(connection) {
    super.init(
      {
        name: Sequelize.STRING,
        avatar_id: Sequelize.INTEGER,
      },
      {
        sequelize: connection,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.File, { foreignKey: 'avatar_id' });
  }
}

export default DeliveryGuy;
