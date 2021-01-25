module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    userId: {
      DataTypes.INTEGER,
      allowNull: false
    },
    bookQuantity: {
      DataTypes.JSON,
      allowNull: false
    },
    totalAmount: {
      DataTypes.FLOAT,
      allowNull: false
    },
    status: {
      DataTypes.ENUM,
      values:['paid','cancelled','fulfilled','returned'],
      allowNull: false
    },
    addressId: {
      DataTypes.INTEGER,
      allowNull: false
    },
    chargeId: {
      DataTypes.STRING,
      allowNull: false
    }
  }, {});
  Order.associate = function(models) {
    Order.belongsTo(models.User,{
      foreignKey:'userId',
      onDelete:'CASCADE'
    })
  };
  return Order;
};