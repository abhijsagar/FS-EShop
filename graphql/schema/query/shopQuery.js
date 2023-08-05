const { GraphQLList, GraphQLID } = require('graphql');
const Shop = require('../../model/shop');
const ShopType = require('../schema/shopSchema');

const shopQuery = () => {
    return {
        getSeller: {
            type: new GraphQLList(ShopType),
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Shop.findById(args.id);
            },
        },
        getShopInfo: {
            type: new GraphQLList(ShopType),
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Shop.findById(args.id);
            },
        },
    };
};

module.exports = shopQuery;
