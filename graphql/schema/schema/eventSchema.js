const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLFloat, GraphQLInt, GraphQLList } = require('graphql');
const ImageType = require('./commonSchema');
const ShopType = require('./shopSchema');

const EventType = new GraphQLObjectType({
    name: 'Event',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        category: { type: GraphQLString },
        start_Date: { type: GraphQLString },
        Finish_Date: { type: GraphQLString },
        status: { type: GraphQLString },
        tags: { type: GraphQLString },
        originalPrice: { type: GraphQLFloat },
        discountPrice: { type: GraphQLFloat },
        stock: { type: GraphQLInt },
        images: { type: new GraphQLList(ImageType) },
        shopId: { type: GraphQLString },
        shop: { type: ShopType },
        sold_out: { type: GraphQLInt },
        createdAt: { type: GraphQLString },
    }),
});

module.exports = EventType;
