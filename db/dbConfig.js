import Sequelize from 'sequelize';

export const connection = new Sequelize('postgres', '', '', {
  dialect: 'postgres'
});

export const Chat = connection.define('Chat', {
  sender: {
    type: Sequelize.BIGINT,
    unique: true,
    allowNull: false
  },
  firstName: Sequelize.STRING,
  lastName: Sequelize.STRING,
  profilePic: Sequelize.STRING,
  active: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  busy: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  solved: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  },
  engaged: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  state: {
    type: Sequelize.STRING,
    defaultValue: 'init'
  }
});

export const Bubble = connection.define('Bubble', {
  userType: {
    type: Sequelize.STRING,
    defaultValue: 'consumer'
  },
  text: Sequelize.TEXT
});

Chat.hasMany(Bubble);
Bubble.belongsTo(Chat);

connection.sync();
// connection.sync({force:true});
