const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLFloat, GraphQLInt, GraphQLList } = require('graphql');
const UserType = require('./userSchema');

const ConversationType = new GraphQLObjectType({
    name: 'Conversation',
    fields: () => ({
        id: { type: GraphQLID },
        groupTitle: { type: GraphQLString },
        members: { type: new GraphQLList(UserType) },
        lastMessage: { type: GraphQLString },
        lastMessageId: { type: GraphQLString },
    }),
});

module.exports = ConversationType;
