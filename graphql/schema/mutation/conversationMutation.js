const { GraphQLID, GraphQLString, GraphQLNonNull } = require('graphql');
const ConversationType = require('../schema/conversationSchema');
const Conversation = require('../../model/conversation');

const conversationMutation = () => {
    return {
        createNewConversation: {
            type: ConversationType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) },
                userId: { type: new GraphQLNonNull(GraphQLString) },
                sellerId: { type: new GraphQLNonNull(GraphQLString) },
                groupTitle: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve(parent, args) {
                const conversation = new Conversation({
                    members: [args.userId, args.sellerId],
                    groupTitle: args.groupTitle,
                });

                return conversation.save();
            },
        },
        updateLastMessage: {
            type: ConversationType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) },
                lastMessage: { type: new GraphQLNonNull(GraphQLString) },
                lastMessageId: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve(parent, args) {
                return Conversation.findByIdAndUpdate(
                    args.id,
                    {
                        $set: {
                            lastMessage: args.lastMessage,
                            lastMessageId: args.lastMessageId,
                        },
                    },
                    { new: true }
                );
            },
        },
    };
};

module.exports = conversationMutation;
