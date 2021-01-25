module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    
    title: {
      type:DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type:DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type:DataTypes.STRING,
      allowNull: false,
      unique:true
    },
    price: {
      type:DataTypes.FLOAT,
      allowNull: false,
    }
    
    }, {}
    
  );
    
  Book.associate = (models) => {
  };
  return Book;
};