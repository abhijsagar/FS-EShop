const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLFloat, GraphQLInt, GraphQLList } = require('graphql');
const ShopType = require('./shopSchema');

const WithdrawType = new GraphQLObjectType({
    name: 'Withdraw',
    fields: () => ({
        id: { type: GraphQLID },
        seller: { type: ShopType },
        amount: { type: GraphQLFloat },
        status: { type: GraphQLString },
        createdAt: { type: GraphQLString },
        updatedAt: { type: GraphQLString },
    }),
});

module.exports = WithdrawType;
