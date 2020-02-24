import Sequelize from 'sequelize';

import User from '../app/models/User';
import Recipient from '../app/models/Recipient';
import File from '../app/models/File';
import DeliveryGuy from '../app/models/DeliveryGuy';
import Signature from '../app/models/Signature';

import databaseConfig from '../config/database';

const models = [User, Recipient, File, DeliveryGuy, Signature];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
