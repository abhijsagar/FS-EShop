const { GraphQLList, GraphQLID } = require('graphql');
const MessageType = require('../schema/messageSchema');
const Messages = require('../../model/messages');

const messageQuery = () => {
    return {
        getAllMessages: {
            type: new GraphQLList(MessageType),
            args: { conversationId: { type: GraphQLID } },
            resolve(parent, args) {
                return Messages.find(args);
            },
        },
    };
};

module.exports = messageQuery;
