const { GraphQLList, GraphQLID } = require('graphql');
const Conversation = require('../../model/conversation');
const ConversationType = require('../schema/conversationSchema');

const conversationQuery = () => {
    return {
        // getAllConversationUser: {
        //     type: new GraphQLList(ConversationType),
        //     args: { members: { $in: [GraphQLID] } },
        //     resolve(parent, args) {
        //         return Conversation.find(args).sort({ updatedAt: -1, createdAt: -1 });
        //     },
        // },
    };
};

module.exports = conversationQuery;
