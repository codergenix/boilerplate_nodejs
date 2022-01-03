module.exports = ( Sequelize, DataTypes) => {
    const Users = Sequelize.define("user",{
        FirstName: {
            type: DataTypes.STRING
        },
        LastName: {
            type: DataTypes.STRING
        },
        Email: {
            type: DataTypes.STRING,
            unique: true
        },
        Password: {
            type: DataTypes.STRING
        },
        Description: {
            type: DataTypes.STRING
        },
        updateBy:{
            type : DataTypes.STRING
        },
        CreatedBy:{
            type : DataTypes.STRING
        },
        deletedAt : {
         type : DataTypes.DATE
        }
    },
     {
        paranoid: true,
        tableName: 'user',
    });
    return Users;
};