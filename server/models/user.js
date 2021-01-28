const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: {
      type:DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type:DataTypes.STRING,
      allowNull: false
    },
    email: {
      type:DataTypes.STRING,
      allowNull: false,
      unique:true
    },
    password: {
      type:DataTypes.STRING,
      allowNull: false
    },
    stripeCustomerId: {
      type:DataTypes.STRING,
      allowNull: false,
      unique:true
    }
    }, {});
  
  User.associate = function(models) {
      User.hasMany(models.Address,{
        foreignKey:'userId',
        as:'addresses'
      })
      User.hasMany(models.Order,{
        foreignKey:'userId',
        as:'orders'
      })
  };
  
  User.prototype.comparePassword = function comparePassword(password, callback) {
    bcrypt.compare(password, this.password,callback);
  }
  
  User.addHook('beforeCreate', (user, options) => {
      const salt = bcrypt.genSaltSync(10);
      user.password = bcrypt.hashSync(user.password, salt);
  })
  
  return User;
};