const { GraphQLList, GraphQLID } = require('graphql');
const ProductType = require('../schema/productSchema');
const Product = require('../../model/product');

const productQuery = () => {
    return {
        getAllProducts: {
            type: new GraphQLList(ProductType),
            resolve(parent, args) {
                return Product.find().sort({ createdAt: -1 });
            },
        },
    };
};

module.exports = productQuery;
