import Sequelize, { Model } from 'sequelize';

class Signature extends Model {
  static init(connection) {
    super.init(
      {
        name: Sequelize.STRING,
        path: Sequelize.STRING,
      },
      {
        sequelize: connection,
      }
    );

    return this;
  }
}

export default Signature;
