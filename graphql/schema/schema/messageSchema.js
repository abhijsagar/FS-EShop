const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLFloat, GraphQLInt, GraphQLList } = require('graphql');
const ImageType = require('./commonSchema');

const MessageType = new GraphQLObjectType({
    name: 'Message',
    fields: () => ({
        id: { type: GraphQLID },
        conversationId: { type: GraphQLString },
        text: { type: GraphQLString },
        sender: { type: GraphQLString },
        images: { type: ImageType },
    }),
});

module.exports = MessageType;
