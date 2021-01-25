const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: {
      DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      DataTypes.STRING,
      allowNull: false
    },
    email: {
      DataTypes.STRING,
      allowNull: false,
      unique:true
    },
    password: {
      DataTypes.STRING,
      allowNull: false
    },
    stripeCustomerId: {
      DataTypes.STRING,
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
  
  User.prototype.comparePassword = function comparePassword(password,callback){
    bcrypt.compare(password,this.password,callback);
  }
  
  User.hook('beforeCreate',(user,options)=>{
      const salt = bcrypt.genSaltSync(10);
      user.password = bcrypt.hashSync(user.password, salt);
  })
  
  return User;
};