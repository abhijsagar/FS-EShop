const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt, GraphQLList } = require('graphql');
const AddressType = require('./commonSchema');
const ImageType = require('./commonSchema');

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        phoneNumber: { type: GraphQLInt },
        addresses: { type: new GraphQLList(AddressType) },
        role: { type: GraphQLString },
        avatar: { type: ImageType },
        createdAt: { type: GraphQLString },
    }),
});

module.exports = UserType;
