const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLFloat, GraphQLInt, GraphQLList } = require('graphql');

const CoupounCodeType = new GraphQLObjectType({
    name: 'CoupounCode',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        value: { type: GraphQLInt },
        minAmount: { type: GraphQLFloat },
        maxAmount: { type: GraphQLFloat },
        shopId: { type: GraphQLString },
        selectedProduct: { type: GraphQLString },
        createdAt: { type: GraphQLString },
    }),
});

module.exports = CoupounCodeType;
