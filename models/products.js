'use strict'
module.exports = (sequelize, Sequelize) => {
    var Product = sequelize.define('products', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        description: {
            type: Sequelize.STRING,
        },
        price: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        image: {
            type: Sequelize.STRING
        },
    },
        {
            charset: 'utf8',
            collate: 'utf8_unicode_ci',
            tableName: 'procducts',
            timestamps: false
        });
    return Product;
}