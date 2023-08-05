const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLFloat, GraphQLInt, GraphQLList } = require('graphql');
const TransectionType = require('./commonSchema');
const ImageType = require('./commonSchema');
const WithdrawType = require('./commonSchema');

const ShopType = new GraphQLObjectType({
    name: 'Shop',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        description: { type: GraphQLString },
        address: { type: GraphQLString },
        phoneNumber: { type: GraphQLInt },
        role: { type: GraphQLString },
        avatar: { type: ImageType },
        zipCode: { type: GraphQLInt },
        withdrawMethod: { type: WithdrawType },
        availableBalance: { type: GraphQLFloat },
        transections: { type: new GraphQLList(TransectionType) },
        createdAt: { type: GraphQLString },
    }),
});

module.exports = ShopType;
