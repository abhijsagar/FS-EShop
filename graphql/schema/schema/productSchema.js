const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLFloat, GraphQLInt, GraphQLList } = require('graphql');
const ImageType = require('./commonSchema');
const ReviewType = require('./commonSchema');
const ShopType = require('./shopSchema');

const ProductType = new GraphQLObjectType({
    name: 'Product',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        category: { type: GraphQLString },
        tags: { type: GraphQLString },
        originalPrice: { type: GraphQLFloat },
        discountPrice: { type: GraphQLFloat },
        stock: { type: GraphQLInt },
        images: { type: new GraphQLList(ImageType) },
        reviews: { type: new GraphQLList(ReviewType) },
        ratings: { type: GraphQLInt },
        shopId: { type: GraphQLString },
        shop: { type: ShopType },
        sold_out: { type: GraphQLInt },
        createdAt: { type: GraphQLString },
    }),
});

module.exports = ProductType;
