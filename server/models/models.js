const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const User = sequelize.define("user", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING },
    role: { type: DataTypes.STRING, defaultValue: "USER" },
    image: { type: DataTypes.STRING },
    licence: { type: DataTypes.BOOLEAN },
    name: { type: DataTypes.STRING },
    sex: { type: DataTypes.STRING },
    telegram: { type: DataTypes.STRING }
});

const Product = sequelize.define("product", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    description: { type: DataTypes.STRING(500), unique: true },
    category: { type: DataTypes.STRING },
    image: { type: DataTypes.STRING(500) },
    price: { type: DataTypes.DECIMAL(10, 2) },
    title: { type: DataTypes.STRING },
    rating: { type: DataTypes.JSONB }
});

const Order = sequelize.define(
    "order",
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        priceOrder: { type: DataTypes.INTEGER },
        products: { type: DataTypes.JSONB },
        created_at: { type: DataTypes.BIGINT }
    },
    { timestamps: false }
);

const Token = sequelize.define(
    "token",
    {
        refreshToken: { type: DataTypes.STRING(500), unique: true },
        userId: { type: DataTypes.INTEGER, unique: true }
    },
    { timestamps: false }
);

User.hasMany(Order);
Order.belongsTo(User);

module.exports = {
    User,
    Product,
    Order,
    Token
};
