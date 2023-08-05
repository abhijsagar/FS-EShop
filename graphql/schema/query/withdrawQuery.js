const { GraphQLList } = require('graphql');
const ProductType = require('../schema/productSchema');

const Product = require('../../model/product');

const withdrawQuery = () => {
    return {
        getAllProducts: {
            type: new GraphQLList(ProductType),
            resolve(parent, args) {
                return Product.find();
            },
        },
    };
};

module.exports = withdrawQuery;
