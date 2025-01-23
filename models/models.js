const {Sequelize , DataTypes} = require('sequelize');

const sequelizeConnect = new Sequelize("translator" , "root" , "ammar12345678" ,
    {
        host: "localhost",
        dialect: "mysql",
    })

sequelizeConnect.sync()
    .then(() => {
        console.log("Sequelize connected successfully.");


    })
    .catch((err) => {
        console.error("Unable to connect to the database:", err);
    });

const user = sequelizeConnect.define("user", {

    user_id:
        {
            primaryKey: true,
            type: DataTypes.INTEGER,
            autoIncrement: true,
        },
    username:
        {
            type: DataTypes.STRING,

        },
    email:
        {
            type: DataTypes.STRING,
        },
    password:
        {
            type: DataTypes.STRING,
        },
    role:
        {
            type: DataTypes.STRING,
            defaultValue: "user"
        }

})

module.exports = {user};