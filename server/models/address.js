module.exports = (sequelize, DataTypes) => {
  const Address = sequelize.define('Address', {
    addressLine: {
      DataTypes.STRING,
      allowNull:false
    },
    city: {
      DataTypes.STRING,
      allowNull:false
    },
    state: {
      DataTypes.STRING,
      allowNull:false
    },
    zip: {
      DataTypes.INTEGER,
      allowNull:false
    },
    country: {
      DataTypes.STRING,
      allowNull:false
    },
  }, {});
  Address.associate = function(models) {
    Address.belongsTo(models.User,{
      foreignKey:'userId',
      onDelete:'CASCADE'
    })
  };
  return Address;
};